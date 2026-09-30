"""Erzeugt src/content.js aus tools/pages.json (Textspannen/Balken der PDF, siehe README).

pages.json entsteht per PyMuPDF aus Gluecksradquiz.pdf (Text-Spans, Balken, Bilder je Seite).
Die Klickpositionen der Glücksrad-Zahlen (circles) wurden aus dem gerenderten Rad ermittelt.
Aufruf: python3 tools/build_content.py tools/pages.json tools/circles.json > src/content.js
"""
import json, sys
pages = json.load(open(sys.argv[1])); circ = json.load(open(sys.argv[2]))

def conv(pg):
    items, num = [], None
    for t in pg['texts']:
        if t['size'] in (87, 115): num = dict(t=t['t'], x=t['x'], y=t['y'], s=t['size'])
        else: items.append(dict(x=t['x'], y=t['y'], s=t['size'], b=t['bold'], t=t['t']))
    return items, num, (pg['bars'][0] if pg['bars'] else None)

fmt = lambda o: json.dumps(o, ensure_ascii=False, separators=(",", ":"))
out = ["// Automatisch aus Gluecksradquiz.pdf erzeugt (tools/build_content.py). Koordinaten in PDF-Punkten (960 x 540), y = Grundlinie.",
       "export const HOME_TITLE = " + fmt(conv(pages[0])[0][0]) + ";",
       "// Klickflächen der Zahlen auf dem Glücksrad (Mittelpunkt und Radius der weißen Scheiben). Adlerfelder sind nicht enthalten.",
       "export const WHEEL_NUMBERS = " + fmt([dict(n=int(l), x=x, y=y, r=r) for l, x, y, r in circ if l != 'E']) + ";",
       "export const QUESTIONS = ["]
for n in range(1, 20):
    q, qn, _ = conv(pages[2 * n - 1]); a, an, bar = conv(pages[2 * n])   # Frage n = Seite 2n, Auflösung = 2n+1
    assert qn == an and qn['t'] == str(n)
    e = dict(n=n, num=qn, q=q, a=a, bar=bar)
    if pages[2 * n - 1]['imgs']: e['img'] = pages[2 * n - 1]['imgs'][0][1]
    out.append("  " + fmt(e) + ",")
out.append("];")
print("\n".join(out))
