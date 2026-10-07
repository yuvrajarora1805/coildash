#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>
#include <ArduinoJson.h>

// --- WiFi Settings ---
const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";

// --- API Settings ---
// Change to your computer's IP address and the Next.js port
const String apiEndpoint = "http://192.168.1.100:3000/api/sensor/update";
const String apiSecret = "secret123"; // Must match SENSOR_API_SECRET in Next.js .env
const String machineId = "S-01"; // Which machine this NodeMCU is attached to

// --- IR Sensor Pins ---
const int irSensor1 = 5; // D1 (GPIO 5)
const int irSensor2 = 4; // D2 (GPIO 4)

// --- State Machine States ---
enum State { IDLE, WAITING_FOR_IR2 };
State currentState = IDLE;

// --- Timing and Debounce ---
unsigned long lastStateChangeTime = 0;
const unsigned long timeoutMs = 5000; // 5 seconds timeout to wait for IR2
const unsigned long debounceDelay = 200; // 200ms debounce

void setup() {
  Serial.begin(115200);
  pinMode(irSensor1, INPUT);
  pinMode(irSensor2, INPUT);

  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nConnected to WiFi");
}

void loop() {
  // Read sensors (LOW means object detected for most IR modules)
  bool ir1Triggered = (digitalRead(irSensor1) == LOW);
  bool ir2Triggered = (digitalRead(irSensor2) == LOW);

  unsigned long currentTime = millis();

  switch (currentState) {
    case IDLE:
      if (ir1Triggered) {
        Serial.println("IR 1 Triggered. Waiting for IR 2...");
        currentState = WAITING_FOR_IR2;
        lastStateChangeTime = currentTime;
        delay(debounceDelay);
      } else if (ir2Triggered) {
        // IR 2 triggered while IDLE (reverse flow or Sensor 1 faulty)
        Serial.println("Error: IR 2 triggered before IR 1! Sensor 1 may be faulty.");
        sendApiUpdate(0, "error", "sensor_1_faulty_or_reverse_flow");
        delay(debounceDelay * 5); // Wait before re-checking to avoid spamming
      }
      break;

    case WAITING_FOR_IR2:
      if (ir2Triggered) {
        // Normal flow completed
        Serial.println("IR 2 Triggered. Count complete!");
        sendApiUpdate(1, "ok", ""); // Send count = 1
        currentState = IDLE;
        delay(debounceDelay);
      } else if (ir1Triggered && (currentTime - lastStateChangeTime > debounceDelay)) {
        // IR 1 triggered AGAIN before IR 2
        Serial.println("Error: IR 1 triggered twice! Sensor 2 may be faulty.");
        sendApiUpdate(0, "error", "sensor_2_faulty");
        lastStateChangeTime = currentTime; // Reset timer
        delay(debounceDelay * 5);
      } else if (currentTime - lastStateChangeTime > timeoutMs) {
        // Timeout waiting for IR 2
        Serial.println("Error: Timeout waiting for IR 2.");
        sendApiUpdate(0, "error", "timeout_waiting_for_sensor_2");
        currentState = IDLE;
      }
      break;
  }
}

void sendApiUpdate(int countIncrement, String status, String errorMsg) {
  if (WiFi.status() == WL_CONNECTED) {
    WiFiClient client;
    HTTPClient http;
    
    http.begin(client, apiEndpoint);
    http.addHeader("Content-Type", "application/json");
    http.addHeader("Authorization", "Bearer " + apiSecret);

    // Create JSON Payload
    StaticJsonDocument<200> doc;
    doc["machine_no"] = machineId;
    doc["count"] = countIncrement;
    doc["status"] = status;
    doc["error_msg"] = errorMsg.length() > 0 ? errorMsg : (char*)NULL;

    String jsonPayload;
    serializeJson(doc, jsonPayload);

    int httpResponseCode = http.POST(jsonPayload);
    
    if (httpResponseCode > 0) {
      String response = http.getString();
      Serial.println("API Response: " + String(httpResponseCode));
      Serial.println(response);
    } else {
      Serial.print("Error on sending POST: ");
      Serial.println(httpResponseCode);
    }
    http.end();
  } else {
    Serial.println("Error in WiFi connection");
  }
}

