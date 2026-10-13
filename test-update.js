const http = require('http');

const data = JSON.stringify({
  card_no: 'PC-20240501-001',
  actual_helix: '5.5',
  actual_lo: '55.0'
});

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/process-card/save-setup',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length,
    // Add a fake cookie if possible, but we can't easily fake next-auth
  }
};
console.log('Testing...');
