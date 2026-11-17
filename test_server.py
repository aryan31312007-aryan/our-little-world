import urllib.request

url = 'http://127.0.0.1:5173/'
print('Testing URL:', url)
with urllib.request.urlopen(url) as resp:
    html = resp.read().decode('utf-8')
    print('Status code:', resp.status)
    print('HTML length:', len(html))
    assert '<div id="root">' in html, "Missing #root"
    assert 'Our Little World' in html, "Missing title"
    print('Index HTML test passed!')

assets = [
    'bg_home.jpg',
    'bg_forever.jpg',
    'bg_apology.jpg',
    'bg_memories.jpg',
    'bg_promise.jpg',
    'bg_justforyou.jpg',
    'romantic_music.wav',
    'memory_1.jpg',
    'memory_2.jpg',
    'memory_3.jpg',
    'memory_4.jpg',
    'memory_5.jpg',
    'couple_kiss_2x.png',
    'bouquet_2x.png'
]

for asset in assets:
    asset_url = f'http://127.0.0.1:5173/assets/{asset}'
    try:
        with urllib.request.urlopen(asset_url) as a_resp:
            content = a_resp.read()
            print(f'Asset {asset}: OK (HTTP {a_resp.status}, {len(content)} bytes)')
    except Exception as e:
        print(f'Asset {asset} FAILED: {e}')
