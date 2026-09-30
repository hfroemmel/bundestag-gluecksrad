"""Extrahiert Text-Spans, Balken und Bilder je PDF-Seite: python3 tools/extract_pages.py Gluecksradquiz.pdf tools/pages.json (PyMuPDF)."""
import pymupdf,json,sys
d=pymupdf.open(sys.argv[1])
out=[]
for i,p in enumerate(d):
    o={"page":i+1,"texts":[],"imgs":[],"bars":[],"order":[]}
    clips=[pymupdf.Rect(dr['scissor']) for dr in p.get_drawings(extended=True) if dr['type']=='clip' and dr['scissor'].width<900]
    for im in p.get_image_info(xrefs=True):
        if im['xref']==7: continue
        r=pymupdf.Rect(im['bbox'])
        for c in clips:                                   # Bilder sind in der PDF teils zugeschnitten (Clip-Rechteck)
            if c.intersects(r) and c.x0>100 and c.y0>100: r=r&c
        o['imgs'].append((im['xref'],[round(x,2) for x in r],[round(x,2) for x in im['bbox']]))
    for dr in p.get_drawings():
        r=dr['rect'];f=dr['fill']
        if f is None: continue
        if 766<=r.x0 and r.x1<=934 and r.y1<=150: continue            # Logo
        if abs(r.x0-815.2)<.1 and abs(r.y0-410)<.1: continue          # Zahlenkreis
        if r.x0<=0.5 and r.y0<=0.5 and r.width>=959: continue         # Hintergrund
        if i==0: continue
        o['bars'].append(dict(rect=[round(x,2) for x in (r.x0,r.y0,r.x1,r.y1)],fill=[round(c,3) for c in f],seqno=dr['seqno']))
    for b in p.get_text("dict")['blocks']:
        if b['type']!=0: continue
        for l in b['lines']:
            for s in l['spans']:
                t=s['text'].rstrip()
                if not t.strip(): continue
                o['texts'].append(dict(x=round(s['origin'][0],2),y=round(s['origin'][1],2),size=round(s['size'],2),bold='Bold' in s['font'],color=s['color'],t=t))
    out.append(o)
json.dump(out,open(sys.argv[2],"w"),ensure_ascii=False,indent=1)
