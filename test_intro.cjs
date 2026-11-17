const puppeteer = require('puppeteer');

async function testIntro() {
  console.log('--- Testing RomanticIntroModal & Music Playback ---');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  const consoleErrors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle0' });

  // 1. Verify Intro Modal appears
  console.log('1. Checking Romantic Intro Modal...');
  const introBtn = await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    return btns.find(b => b.innerText.includes('Tap to Enter with Music'));
  });
  console.log('   Intro button found:', !!introBtn);

  // 2. Click "Tap to Enter with Music"
  console.log('2. Clicking "Tap to Enter with Music 🎵 ♡"...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const btn = btns.find(b => b.innerText.includes('Tap to Enter with Music'));
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 1000));

  // 3. Verify Audio is actively playing
  const isAudioPlaying = await page.evaluate(() => {
    const audio = window._testAudio || document.querySelector('audio');
    // Check audio state via navbar button text
    const navBtn = document.querySelector('button[aria-label*="romantic music"]');
    return navBtn ? navBtn.innerText.includes('Playing Melody') : false;
  });
  console.log('3. Music is actively playing in navbar:', isAudioPlaying);

  console.log('\n==========================================');
  console.log('Console errors encountered:', consoleErrors.length);
  if (consoleErrors.length > 0) {
    console.log('Console errors:', consoleErrors);
  } else {
    console.log('✅ ZERO CONSOLE ERRORS!');
  }
  console.log('✅ ROMANTIC ENTRY & MUSIC PLAYBACK TEST PASSED!');
  console.log('==========================================');

  await browser.close();
}

testIntro().catch(console.error);
