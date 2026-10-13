const http = require('http');

const data = JSON.stringify({
  card_no: 'PC-20261008-0001', // We will fetch a real draft card number from DB first
  actual_helix: '3.5',
  actual_lo: '50.0',
  actual_od_id: '19.0',
  actual_nc: '6.0',
  actual_ends: '2.5'
});

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/process-card/save-setup',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = http.request(options, res => {
  console.log(`statusCode: ${res.statusCode}`);
  let body = '';
  res.on('data', d => {
    body += d;
  });
  res.on('end', () => {
    console.log('body:', body);
  });
});

req.on('error', error => {
  console.error(error);
});

req.write(data);
req.end();
