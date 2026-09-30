"""Schneidet die Fotos zu Frage/Auflösung 5 auf den in der PDF sichtbaren Ausschnitt (Clip) zu.
Aufruf: python3 tools/crop_images.py <frage5.jpg roh> <antwort5.jpg roh>   (Rohbilder = per PyMuPDF extrahierte PDF-Bilder xref 65 / 70)"""
import json, sys
from PIL import Image
pages = json.load(open('tools/pages.json'))
for src, page, dst in ((sys.argv[1], 10, 'src/assets/frage5.jpg'), (sys.argv[2], 11, 'src/assets/antwort5.jpg')):
    _, clip, full = pages[page - 1]['imgs'][0]
    im = Image.open(src).convert('RGB'); k = im.width / (full[2] - full[0])
    box = [round((clip[0] - full[0]) * k), round((clip[1] - full[1]) * k), round((clip[2] - full[0]) * k), round((clip[3] - full[1]) * k)]
    c = im.crop(box); w = 1500; c.resize((w, round(c.height * w / c.width)), Image.LANCZOS).save(dst, quality=84, optimize=True, progressive=True)
