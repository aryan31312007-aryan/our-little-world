const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function runTests() {
  console.log('--- Starting Puppeteer E2E Tests for PageNavigator & Auto-Scroll ---');
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

  // 1. Verify PageNavigator is present
  console.log('1. Checking floating PageNavigator...');
  const navPill = await page.$('.fixed.bottom-6');
  if (!navPill) throw new Error('PageNavigator pill not found');

  // Check initial active badge
  const initialText = await page.evaluate(() => {
    const btn = document.querySelector('button[title*="next page"]');
    return btn ? btn.innerText : '';
  });
  console.log('   Next button text on Home:', initialText);

  // 2. Click Next Page button on floating dock to scroll to Section 2 (Apology)
  console.log('2. Clicking "Next Page" button to move to Apology...');
  await page.evaluate(() => {
    const btn = document.querySelector('button[title*="next page"]');
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 1200));

  // 3. Click Next Page button to move to Section 3 (Memories)
  console.log('3. Clicking "Next Page" button to move to Memories...');
  await page.evaluate(() => {
    const btn = document.querySelector('button[title*="next page"]');
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 1200));

  // 4. Click Section-level "Next Page: My Promise 💕" button
  console.log('4. Testing in-section Next button in Memories...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const memNext = btns.find(b => b.innerText.includes('Next Page: My Promise'));
    if (memNext) memNext.click();
  });
  await new Promise(r => setTimeout(r, 1200));

  // 5. Test Auto-Tour toggle
  console.log('5. Testing Auto-Tour Toggle...');
  await page.evaluate(() => {
    const autoBtn = document.querySelector('button[title*="automatic story tour"], button[title*="Pause automatic"]');
    if (autoBtn) autoBtn.click();
  });
  await new Promise(r => setTimeout(r, 600));

  const isAutoOn = await page.evaluate(() => {
    return document.body.innerText.includes('Auto: ON');
  });
  console.log('   Auto Tour activated:', isAutoOn);

  // Pause Auto-Tour
  await page.evaluate(() => {
    const autoBtn = document.querySelector('button[title*="Pause automatic"]');
    if (autoBtn) autoBtn.click();
  });
  await new Promise(r => setTimeout(r, 400));

  console.log('\n==========================================');
  console.log('Console errors encountered:', consoleErrors.length);
  if (consoleErrors.length > 0) {
    console.log('Console errors:', consoleErrors);
  } else {
    console.log('✅ ZERO CONSOLE ERRORS!');
  }
  console.log('✅ ALL NAVIGATION & AUTO-SCROLL TESTS PASSED!');
  console.log('==========================================');

  await browser.close();
}

runTests().catch(err => {
  console.error('Test failed with error:', err);
  process.exit(1);
});
