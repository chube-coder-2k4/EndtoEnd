Feature('Validate Date API');

const assert = require('assert');

Scenario('Kiểm tra ngày hợp lệ', async ({ I }) => {
  const res = await I.sendPostRequest('/api/validate-date', {
    day: '30',
    month: '6',
    year: '2025'
  });
  assert.strictEqual(res.status, 200);
  assert.strictEqual(res.data.valid, true);
  assert.strictEqual(res.data.message, '✅ Valid Date: 30/6/2025');
});

Scenario('Kiểm tra ngày không hợp lệ', async ({ I }) => {
  const res = await I.sendPostRequest('/api/validate-date', {
    day: '31',
    month: '4',
    year: '2025'
  });
  assert.strictEqual(res.status, 200);
  assert.strictEqual(res.data.valid, false);
  assert.strictEqual(res.data.message, '❌ Invalid Date: 31/4/2025');
});

Scenario('Kiểm tra đầu vào không phải số', async ({ I }) => {
  const res = await I.sendPostRequest('/api/validate-date', {
    day: 'abc',
    month: '6',
    year: '2025'
  });
  assert.strictEqual(res.status, 200);
  assert.strictEqual(res.data.valid, false);
  assert.strictEqual(res.data.message, '❌ Invalid input: All fields must be numbers.');
});

Scenario('Kiểm tra đầu vào ngoài phạm vi', async ({ I }) => {
  const res = await I.sendPostRequest('/api/validate-date', {
    day: '1',
    month: '13',
    year: '2025'
  });
  assert.strictEqual(res.status, 200);
  assert.strictEqual(res.data.valid, false);
  assert.strictEqual(res.data.message, '❌ Invalid input: Out of range.');
});

Scenario('Kiểm tra thiếu trường day', async ({ I }) => {
  const res = await I.sendPostRequest('/api/validate-date', {
    month: '6',
    year: '2025'
  });
  assert.strictEqual(res.status, 200);
  assert.strictEqual(res.data.valid, false);
  assert.strictEqual(res.data.message, '❌ Invalid input: All fields must be numbers.');
});

Scenario('Kiểm tra định dạng JSON hợp lệ', async ({ I }) => {
  const res = await I.sendPostRequest('/api/validate-date', {
    day: '30',
    month: '6',
    year: '2025'
  });
  assert.strictEqual(res.status, 200);
  assert.ok(res.data.hasOwnProperty('valid'));
  assert.ok(res.data.hasOwnProperty('message'));
});