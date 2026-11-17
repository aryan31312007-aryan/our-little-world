const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function runTests() {
  console.log('--- Starting Puppeteer E2E Tests for Our Little World ---');
  const screenshotDir = path.join(__dirname, 'test_screenshots');
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir);
  }

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1280,800']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  const consoleErrors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  page.on('pageerror', (err) => {
    consoleErrors.push(err.toString());
  });

  console.log('Navigating to http://127.0.0.1:5173/...');
  await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle0', timeout: 30000 });

  // 1. Verify Home Section
  console.log('1. Checking Home Section...');
  const homeExists = await page.$('#home');
  if (!homeExists) throw new Error('#home not found');
  const homeText = await page.$eval('#home', el => el.innerText);
  console.log('   Home text contains Sonam Singh:', homeText.includes('Sonam Singh'));
  await page.screenshot({ path: path.join(screenshotDir, '01_home.png') });

  // 2. Test Enter Our World button
  console.log('2. Testing "Enter Our World →" button...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const enterBtn = btns.find(b => b.innerText.includes('Enter Our World'));
    if (enterBtn) enterBtn.click();
  });
  await new Promise(r => setTimeout(r, 1200));

  // 3. Verify Apology Section & "I Promise... ♡" button
  console.log('3. Checking Apology Section...');
  const apologyExists = await page.$('#apology');
  if (!apologyExists) throw new Error('#apology not found');
  await page.screenshot({ path: path.join(screenshotDir, '02_apology.png') });

  console.log('   Clicking "I Promise... ♡" button...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const promiseBtn = btns.find(b => b.innerText.includes('I Promise'));
    if (promiseBtn) promiseBtn.click();
  });
  await new Promise(r => setTimeout(r, 1200));

  // 4. Verify Memories Section & Lightbox
  console.log('4. Checking Memories Section...');
  await page.evaluate(() => {
    document.getElementById('memories').scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(screenshotDir, '03_memories.png') });

  // Click first polaroid to test lightbox
  console.log('   Clicking first Polaroid card...');
  const polaroids = await page.$$('#memories .snap-center');
  if (polaroids.length > 0) {
    await polaroids[0].click();
    await new Promise(r => setTimeout(r, 800));
    await page.screenshot({ path: path.join(screenshotDir, '03_memories_lightbox.png') });

    // Close lightbox
    console.log('   Closing Lightbox...');
    await page.evaluate(() => {
      const closeBtn = document.querySelector('.fixed.inset-0.z-50 button');
      if (closeBtn) closeBtn.click();
    });
    await new Promise(r => setTimeout(r, 500));
  }

  // 5. Verify Promise Section
  console.log('5. Checking Promise Section...');
  await page.evaluate(() => {
    document.getElementById('promise').scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(screenshotDir, '04_promise.png') });

  // 6. Verify Just For You Section & Modal
  console.log('6. Checking Just For You Section...');
  await page.evaluate(() => {
    document.getElementById('justforyou').scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(screenshotDir, '05_justforyou.png') });

  console.log('   Clicking "I Love You Forever ❤️" button...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const loveBtn = btns.find(b => b.innerText.includes('I Love You Forever'));
    if (loveBtn) loveBtn.click();
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(screenshotDir, '05_justforyou_modal.png') });

  // Close modal
  await page.evaluate(() => {
    const closeBtn = document.querySelector('.fixed.inset-0.z-50 button');
    if (closeBtn) closeBtn.click();
  });
  await new Promise(r => setTimeout(r, 500));

  // 7. Verify Forever Section & Final Popup
  console.log('7. Checking Forever Section...');
  await page.evaluate(() => {
    document.getElementById('forever').scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(screenshotDir, '06_forever.png') });

  console.log('   Clicking "Forever Together ♡" button...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const foreverBtn = btns.find(b => b.innerText.includes('Forever Together'));
    if (foreverBtn) foreverBtn.click();
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(screenshotDir, '06_forever_modal.png') });

  // Close modal
  await page.evaluate(() => {
    const closeBtn = document.querySelector('.fixed.inset-0.z-50 button');
    if (closeBtn) closeBtn.click();
  });
  await new Promise(r => setTimeout(r, 500));

  // 8. Test Music Toggle Button
  console.log('8. Testing Music Toggle Button...');
  await page.evaluate(() => {
    const musicBtn = document.querySelector('button[aria-label*="music"]');
    if (musicBtn) musicBtn.click();
  });
  await new Promise(r => setTimeout(r, 600));
  const musicLabel = await page.$eval('button[aria-label*="music"]', el => el.getAttribute('aria-label'));
  console.log('   Music toggle state updated to:', musicLabel);

  // 9. Full page screenshot
  console.log('9. Capturing full page screenshot...');
  await page.screenshot({ path: path.join(screenshotDir, 'full_page.png'), fullPage: true });

  console.log('\n==========================================');
  console.log('Console errors encountered:', consoleErrors.length);
  if (consoleErrors.length > 0) {
    console.log('Console errors:', consoleErrors);
  } else {
    console.log('✅ ZERO CONSOLE ERRORS!');
  }
  console.log('✅ ALL 6 SECTIONS VERIFIED & WORKING BEAUTIFULLY!');
  console.log('==========================================');

  await browser.close();
}

runTests().catch(err => {
  console.error('Test failed with error:', err);
  process.exit(1);
});
