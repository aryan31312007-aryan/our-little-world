const puppeteer = require('puppeteer');

async function testAudioAutoplay() {
  console.log('Testing Audio Autoplay on site entry...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--autoplay-policy=no-user-gesture-required']
  });

  const page = await browser.newPage();
  await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle0' });

  // Check if audio element exists and is playing
  const isPlaying = await page.evaluate(async () => {
    const audio = document.querySelector('audio');
    if (!audio) return false;
    return !audio.paused && audio.currentTime > 0;
  });

  console.log('Audio is actively playing on entry:', isPlaying);

  // Check the button UI label
  const btnLabel = await page.$eval('button[aria-label*="music"]', el => el.getAttribute('aria-label'));
  console.log('Music button shows:', btnLabel);

  await browser.close();
  console.log('Autoplay test finished successfully!');
}

testAudioAutoplay().catch(console.error);
