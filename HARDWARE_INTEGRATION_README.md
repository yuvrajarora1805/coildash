# Hardware Integration Guide: ESP32 / NodeMCU / Microcontroller API

This document provides complete instructions, API specifications, and reference firmware code for integrating ESP32, ESP8266, NodeMCU, Raspberry Pi Pico W, or any IoT microcontroller with the Coil-O-Matic real-time production dashboard.

---

## 1. System Overview

```text
+-----------------------+           WiFi / HTTP POST            +----------------------------+
| Microcontroller (IoT) |  ---------------------------------->  | Coil-O-Matic Backend       |
| (ESP32 / NodeMCU)     |    Endpoint: /api/sensor/update       | Next.js + MySQL Database   |
| Attached to Machine   |    Auth: Bearer Token                 | Updates live count & status|
+-----------------------+                                       +----------------------------+
       |          |
   [Sensor 1] [Sensor 2]  (Directional entry/exit verification)
```

1. **Heartbeat / Ping**: Sent periodically (e.g. every 3–5 seconds) to let the dashboard know the machine and sensor unit are online.
2. **Production Count**: When a completed coil passes through the inspection/chute sensors, the microcontroller sends an incremental count (`+1`, `+5`, etc.).
3. **Fault / Error Reporting**: If a sensor times out, triggers out of order, or detects a jam, the microcontroller reports an error state.

---

## 2. API Endpoint Specification

### `POST /api/sensor/update`

* **Protocol**: HTTP / HTTPS
* **Method**: `POST`
* **Content-Type**: `application/json`

### HTTP Headers
| Header Name | Value | Description |
|:---|:---|:---|
| `Content-Type` | `application/json` | Must be JSON |
| `Authorization` | `Bearer <API_SECRET>` | Shared API secret key (Default: `secret123` or matches `SENSOR_API_SECRET` in `.env`) |

---

### Request Payloads

#### A. Increment Production Count (Item Produced)
Send whenever an item or coil is successfully produced and passes the sensors.

```json
{
  "machine_no": "S-01",
  "count": 1,
  "status": "ok"
}
```

* **`machine_no`** *(string, required)*: The unique identifier of the machine (e.g. `"S-01"`, `"S-02"`, `"S-03"`).
* **`count`** *(integer, required)*: Number of units to increment in the database (typically `1`).
* **`status`** *(string, required)*: Set to `"ok"`.

---

#### B. Heartbeat Ping (Keep Machine Online)
Send every 3 to 5 seconds when idle so the dashboard shows the machine status as "Active / Online".

```json
{
  "machine_no": "S-01",
  "count": 0,
  "status": "ping"
}
```

* **`machine_no`** *(string, required)*: Machine ID.
* **`count`** *(integer, required)*: Set to `0`.
* **`status`** *(string, required)*: Set to `"ping"`.
* *Behavior*: Updates `last_seen = CURRENT_TIMESTAMP` without altering production counts.

---

#### C. Error / Fault Notification (Jam, Sensor Fault, Out of Order)
Send if the sensor detects an abnormal state.

```json
{
  "machine_no": "S-01",
  "count": 0,
  "status": "error",
  "error_msg": "sensor_1_faulty_or_reverse_flow"
}
```

* **`status`** *(string, required)*: Set to `"error"`.
* **`error_msg`** *(string, optional)*: Short diagnostic error key, such as:
  * `"sensor_1_faulty_or_reverse_flow"`
  * `"sensor_2_faulty"`
  * `"timeout_waiting_for_sensor_2"`
  * `"wire_jam"`

---

### API Responses

#### 1. Success (200 OK)
```json
{
  "success": true
}
```
*(For ping, returns `{"success": true, "ping": true}`)*

#### 2. Unauthorized (401 Unauthorized)
```json
{
  "error": "Unauthorized"
}
```
*Cause: Missing or incorrect `Authorization: Bearer <API_SECRET>` header.*

#### 3. Machine Not Found (404 Not Found)
```json
{
  "error": "Machine not found"
}
```
*Cause: The `machine_no` does not exist in the database `machines` table.*

#### 4. Invalid Payload (400 Bad Request)
```json
{
  "error": "Invalid payload"
}
```
*Cause: Missing `machine_no` or `count` is not a number.*

---

## 3. Quick cURL Test Examples

### Heartbeat:
```bash
curl -X POST http://<SERVER_IP>:3000/api/sensor/update \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer secret123" \
  -d '{"machine_no": "S-01", "count": 0, "status": "ping"}'
```

### Add 1 to Production Count:
```bash
curl -X POST http://<SERVER_IP>:3000/api/sensor/update \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer secret123" \
  -d '{"machine_no": "S-01", "count": 1, "status": "ok"}'
```

---

## 4. Dual-IR Directional Sensor Logic

To avoid false triggers from vibrations, reflections, or operators reaching into the chute, use a two-sensor state machine:

```text
       Flow Direction ===>
   [ Sensor 1 (Entry) ] ----> [ Sensor 2 (Exit) ]

1. IDLE:
   - When Sensor 1 triggers -> Enter WAITING_FOR_SENSOR_2, start timer.
   - If Sensor 2 triggers first -> ERROR (Reverse flow or Sensor 1 broken).

2. WAITING_FOR_SENSOR_2:
   - When Sensor 2 triggers within timeout -> Valid coil produced! Send count: 1, return to IDLE.
   - If Sensor 1 triggers again -> ERROR (Sensor 2 missed / jammed).
   - If timer exceeds 5000ms -> ERROR (Timeout / Part stuck between sensors).
```

---

## 5. Ready-to-Use ESP32 Reference Code (Arduino IDE)

Required Arduino Libraries:
- **`WiFi.h`** (Built-in for ESP32)
- **`HTTPClient.h`** (Built-in for ESP32)
- **`ArduinoJson`** (Install via Arduino Library Manager, version 6 or 7)

```cpp
#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

// ================= USER CONFIGURATION =================
const char* WIFI_SSID     = "Your_WiFi_SSID";
const char* WIFI_PASSWORD = "Your_WiFi_Password";

// Replace with your server's IP address and port
const char* API_URL       = "http://192.168.1.100:3000/api/sensor/update";
const char* API_SECRET    = "secret123"; // Must match SENSOR_API_SECRET
const char* MACHINE_NO    = "S-01";      // Unique machine code

// Pin Definitions for ESP32 (Adjust to your wiring)
const int PIN_SENSOR_1    = 18; // GPIO 18 (Entry Sensor)
const int PIN_SENSOR_2    = 19; // GPIO 19 (Exit Sensor)

// Timing settings
const unsigned long PING_INTERVAL   = 3000; // Send heartbeat ping every 3 seconds
const unsigned long SENSOR_TIMEOUT  = 5000; // Max ms to wait for Sensor 2 after Sensor 1
const unsigned long DEBOUNCE_DELAY  = 150;  // Debounce ms

// ================= STATE MACHINE =================
enum State { STATE_IDLE, STATE_WAITING_EXIT };
State currentState = STATE_IDLE;

unsigned long lastPingTime = 0;
unsigned long stateStartTime = 0;

void sendApiPayload(int count, const char* status, const char* errorMsg = "") {
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("[HTTP] WiFi not connected. Skipping API call.");
    return;
  }

  HTTPClient http;
  http.begin(API_URL);
  http.addHeader("Content-Type", "application/json");

  String authHeader = String("Bearer ") + API_SECRET;
  http.addHeader("Authorization", authHeader);

  // Construct JSON Payload
  StaticJsonDocument<200> doc;
  doc["machine_no"] = MACHINE_NO;
  doc["count"] = count;
  doc["status"] = status;
  if (strlen(errorMsg) > 0) {
    doc["error_msg"] = errorMsg;
  }

  String requestBody;
  serializeJson(doc, requestBody);

  int httpCode = http.POST(requestBody);

  if (httpCode > 0) {
    Serial.printf("[HTTP] POST %s -> Response Code: %d\n", status, httpCode);
  } else {
    Serial.printf("[HTTP] POST failed, error: %s\n", http.errorToString(httpCode).c_str());
  }

  http.end();
}

void setup() {
  Serial.begin(115200);

  // Optical IR modules usually output LOW when object is detected
  pinMode(PIN_SENSOR_1, INPUT_PULLUP);
  pinMode(PIN_SENSOR_2, INPUT_PULLUP);

  Serial.println("\nConnecting to WiFi...");
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("\nWiFi connected! IP address: ");
  Serial.println(WiFi.localIP());
}

void loop() {
  unsigned long now = millis();

  // Active-LOW trigger check (object in front of sensor gives LOW)
  bool s1Active = (digitalRead(PIN_SENSOR_1) == LOW);
  bool s2Active = (digitalRead(PIN_SENSOR_2) == LOW);

  // 1. Send periodic heartbeat ping
  if (now - lastPingTime >= PING_INTERVAL) {
    sendApiPayload(0, "ping");
    lastPingTime = now;
  }

  // 2. State Machine for directional part counting
  switch (currentState) {
    case STATE_IDLE:
      if (s1Active) {
        Serial.println("Sensor 1 triggered. Waiting for Sensor 2...");
        currentState = STATE_WAITING_EXIT;
        stateStartTime = now;
        delay(DEBOUNCE_DELAY);
      } else if (s2Active) {
        // Reverse direction or Sensor 1 broken
        Serial.println("[ERROR] Sensor 2 triggered before Sensor 1!");
        sendApiPayload(0, "error", "sensor_1_faulty_or_reverse_flow");
        delay(DEBOUNCE_DELAY * 4);
      }
      break;

    case STATE_WAITING_EXIT:
      if (s2Active) {
        // Successful coil exit
        Serial.println("[COUNT] Part exited chute. Incrementing count +1.");
        sendApiPayload(1, "ok");
        currentState = STATE_IDLE;
        delay(DEBOUNCE_DELAY);
      } else if (s1Active && (now - stateStartTime > DEBOUNCE_DELAY)) {
        // Sensor 1 triggered again before Sensor 2 finished
        Serial.println("[ERROR] Double entry detected! Sensor 2 may be blocked.");
        sendApiPayload(0, "error", "sensor_2_faulty");
        stateStartTime = now;
        delay(DEBOUNCE_DELAY * 4);
      } else if (now - stateStartTime > SENSOR_TIMEOUT) {
        // Timeout waiting for part to exit
        Serial.println("[ERROR] Timeout waiting for exit sensor.");
        sendApiPayload(0, "error", "timeout_waiting_for_sensor_2");
        currentState = STATE_IDLE;
      }
      break;
  }
}
```

---

## 6. Checklist for Firmware Developer

- [ ] Confirm Server IP address & port (ensure machine can ping server over LAN).
- [ ] Ensure `machine_no` matches the machine listed in the dashboard (e.g. `S-01`, `S-02`, `S-03`).
- [ ] Verify `API_SECRET` matches `SENSOR_API_SECRET` configured on the server.
- [ ] Test sensor polarity (Active LOW vs Active HIGH) with a multimeter or Serial Monitor.
- [ ] Run a test cURL command from your laptop to confirm network and firewall connectivity before programming the microcontroller.
