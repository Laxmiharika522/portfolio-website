import urllib.request
import re

urls = [
    'https://www.credly.com/badges/82a3721c-934d-43bc-8bff-f254babfc531/public_url',
    'https://www.credly.com/badges/aea28239-144b-4af8-b466-fcbd354dd5bd/public_url',
    'https://www.credly.com/badges/eaf665fd-2c16-4e9e-a231-8456963405ec/public_url'
]

for url in urls:
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    html = urllib.request.urlopen(req).read().decode('utf-8')
    m = re.search(r'<meta property="og:image" content="([^"]+)"', html)
    print(m.group(1) if m else "None")
