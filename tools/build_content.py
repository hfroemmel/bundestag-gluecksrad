"""Erzeugt src/content.js aus tools/pages.json (siehe tools/extract_pages.py) und tools/circles.json.

Seiten der PDF: 1 = Home, 2n = Frage n, 2n+1 = Auflösung n (n = 1..19), 40 = Joker.
Die Klickpositionen der Glücksrad-Felder (circles) wurden aus dem gerenderten Rad ermittelt ('E' = Adlerfeld).
Aufruf: python3 tools/build_content.py tools/pages.json tools/circles.json > src/content.js
"""
import json, sys
pages = json.load(open(sys.argv[1])); circ = json.load(open(sys.argv[2]))
WHITE, GREEN = 0xFFFFFF, [0.42, 0.718, 0.298]
NUM_SIZES = (87, 115)

def conv(pg, green=True):
    """-> Textzeilen, Zahl (Zahlenkreis), Balken, Bild (Rechteck)"""
    items, num = [], None
    for t in pg['texts']:
        if t['size'] in NUM_SIZES: num = dict(t=t['t'], x=t['x'], y=t['y'], s=t['size'])
        else:
            it = dict(x=t['x'], y=t['y'], s=t['size'], b=t['bold'], t=t['t'])
            if t['color'] != WHITE: it['c'] = '#%06x' % t['color']
            items.append(it)
    bar = None
    if pg['bars']:
        b = pg['bars'][-1]; bar = list(b['rect'])
        assert not green or all(abs(x - y) < .01 for x, y in zip(b['fill'], GREEN)), b   # alle Balken sind grün
    img = pg['imgs'][0][1] if pg['imgs'] else None
    return items, num, bar, img

fmt = lambda o: json.dumps(o, ensure_ascii=False, separators=(",", ":"))
home = conv(pages[0])
ji, _, jbar, jimg = conv(pages[39], green=False)
# Tippfehler der PDF ("Jocker") korrigiert; der Text ist zentriert gesetzt -> x so verschieben, dass die Mitte gleich bleibt
assert ji[0]['t'] == 'Jocker'
ji[0].update(t='Joker', x=420.61)
out = ["// Automatisch aus Gluecksradquiz.pdf erzeugt (tools/build_content.py). Koordinaten in PDF-Punkten (960 x 540), y = Grundlinie.",
       "export const HOME_TITLE = " + fmt(home[0][0]) + ";",
       "// Klickflächen auf dem Glücksrad (Mittelpunkt und Radius der weißen Scheiben): Zahlen 1-19 und die drei Adlerfelder (Joker).",
       "export const WHEEL_NUMBERS = " + fmt([dict(n=int(l), x=x, y=y, r=r) for l, x, y, r in circ if l != 'E']) + ";",
       "export const JOKER_FIELDS = " + fmt([dict(x=x, y=y, r=r) for l, x, y, r in circ if l == 'E']) + ";",
       "// Jokerseite (PDF-Seite 40): großer Adler (Rechteck), pinker Balken, Text",
       "export const JOKER = " + fmt(dict(eagle=[297.1, 110.28, 663.92, 428.5], bar=jbar, fill='#cd237c', text=ji[0])) + ";",
       "export const QUESTIONS = ["]
for n in range(1, 20):
    q, qn, qbar, qimg = conv(pages[2 * n - 1]); a, an, abar, aimg = conv(pages[2 * n])
    assert qn == an and qn['t'] == str(n) and qbar is None
    e = dict(n=n, num=qn, q=q, a=a, bar=abar)
    if qimg: e['qimg'] = qimg
    if aimg: e['aimg'] = aimg
    out.append("  " + fmt(e) + ",")
out.append("];")
print("\n".join(out))
