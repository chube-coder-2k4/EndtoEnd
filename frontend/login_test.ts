Feature('Date Time Checker Web');

const baseUrl = 'http://127.0.0.1:5500/index.html';

Scenario('Check valid leap year date (29/2/2024)', async ({ I }) => {
  I.amOnPage(baseUrl);
  I.fillField('#day', '29');
  I.fillField('#month', '2');
  I.fillField('#year', '2024');
  I.click('Check');
  I.see('Valid Date: 29/2/2024', '#result');
});

Scenario('Check invalid date (31/2/2023)', async ({ I }) => {
  I.amOnPage(baseUrl);
  I.fillField('#day', '31');
  I.fillField('#month', '2');
  I.fillField('#year', '2023');
  I.click('Check');
  I.see('Invalid Date: 31/2/2023', '#result');
});

Scenario('Check when fields are empty', async ({ I }) => {
  I.amOnPage(baseUrl);
  I.click('Check');
  I.see('Invalid input: All fields must be numbers.', '#result');
});

Scenario('Clear button should empty all fields', async ({ I }) => {
  I.amOnPage(baseUrl);
  I.fillField('#day', '15');
  I.fillField('#month', '10');
  I.fillField('#year', '2025');
  I.click('Clear');
  I.seeInField('#day', '');
  I.seeInField('#month', '');
  I.seeInField('#year', '');
});
// TC05 - Nhập ngày = 0 (biên dưới không hợp lệ)
Scenario('Day is zero (invalid)', async ({ I }) => {
  I.amOnPage(baseUrl);
  I.fillField('#day', '0');
  I.fillField('#month', '5');
  I.fillField('#year', '2023');
  I.click('Check');
  I.see('Invalid input: Out of range.', '#result');
});

// TC06 - Nhập tháng = 13 (biên trên không hợp lệ)
Scenario('Month is 13 (invalid)', async ({ I }) => {
  I.amOnPage(baseUrl);
  I.fillField('#day', '10');
  I.fillField('#month', '13');
  I.fillField('#year', '2023');
  I.click('Check');
  I.see('Invalid input: Out of range.', '#result');
});

// TC07 - Nhập năm < 1000 (invalid)
Scenario('Year is below allowed range (999)', async ({ I }) => {
  I.amOnPage(baseUrl);
  I.fillField('#day', '10');
  I.fillField('#month', '10');
  I.fillField('#year', '999');
  I.click('Check');
  I.see('Invalid input: Out of range.', '#result');
});

// TC08 - Nhập ký tự chữ thay vì số
Scenario('Enter letters instead of numbers', async ({ I }) => {
  I.amOnPage(baseUrl);
  I.fillField('#day', 'abc');
  I.fillField('#month', 'def');
  I.fillField('#year', 'ghi');
  I.click('Check');
  I.see('Invalid input: All fields must be numbers.', '#result');
});

// TC09 - Nhập ngày ở cuối tháng hợp lệ (30/4/2023)
Scenario('Valid end-of-month date (30/4/2023)', async ({ I }) => {
  I.amOnPage(baseUrl);
  I.fillField('#day', '30');
  I.fillField('#month', '4');
  I.fillField('#year', '2023');
  I.click('Check');
  I.see('Valid Date: 30/4/2023', '#result');
});

// TC10 - Nhập ngày 31 vào tháng chỉ có 30 ngày (31/4/2023)
Scenario('Invalid 31st day in April (only has 30 days)', async ({ I }) => {
  I.amOnPage(baseUrl);
  I.fillField('#day', '31');
  I.fillField('#month', '4');
  I.fillField('#year', '2023');
  I.click('Check');
  I.see('Invalid Date: 31/4/2023', '#result');
});
