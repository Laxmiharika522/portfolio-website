import urllib.request
import re
import os

certs = {
    'Problem Solving': 'https://www.hackerrank.com/certificates/b91b8156cba4',
    'Java': 'https://www.hackerrank.com/certificates/fa70d61aefc5',
    'Python': 'https://www.hackerrank.com/certificates/f6c263c3f71d',
    'SQL': 'https://www.hackerrank.com/certificates/74a6213256f9',
    'CSS': 'https://www.hackerrank.com/certificates/045e119f7d3e'
}

for name, url in certs.items():
    print(f"Fetching {name}...")
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        html = urllib.request.urlopen(req).read().decode('utf-8')
        m = re.search(r'<meta property="og:image" content="([^"]+)"', html)
        if m:
            img_url = m.group(1)
            print(f"Found image URL: {img_url}")
            filename = f"cert_{name.replace(' ', '_').lower()}.jpg"
            urllib.request.urlretrieve(img_url, filename)
            print(f"Saved {filename}")
        else:
            print("No image found.")
    except Exception as e:
        print(f"Error: {e}")
