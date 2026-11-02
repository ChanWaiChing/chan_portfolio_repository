# Global portfolio thumbnails

Added 18 locally stored WebP thumbnails on 2026-11-02 for the new global website entries. All assets come from their linked websites, with no generated substitute artwork. Images are 1200 ? 800 pixels and appear in both cards and project details.

Hush uses its homepage hero image and Lancastrian Estates uses its team photograph to avoid cookie overlays or unloaded slideshow backgrounds. LA Crawfish uses its own shipped-fresh website image because screenshot access returns HTTP 403.

| Project | Capture type | Source |
| --- | --- | --- |
| Hush | Website image | https://www.datocms-assets.com/163675/1793034821-wk31-nov-launch-desktop-v3.jpg?auto=format,compress&ar=12:7&fit=crop&crop=faces,edges&q=80&w=1440 |
| Lomi Café | Homepage screenshot | https://lomi.cafe/ |
| Lambert Bags | Homepage screenshot | https://lambertbags.com/ |
| LA Crawfish | Website image | https://www.lacrawfish.com/wp-content/uploads/2026/02/shipped-fresh.webp |
| Facefacts Buxton | Homepage screenshot | https://www.facefactsbuxton.co.uk/ |
| Van Michael | Homepage screenshot | https://vanmichael.com/ |
| Koko Hair | Homepage screenshot | https://kokohair.co.uk/ |
| Beauty Lounge Bergedorf | Homepage screenshot | https://beauty-lounge-bergedorf.de/ |
| Anushka Spa | Homepage screenshot | https://www.anushkaspa.com/ |
| Manor Real Estate | Homepage screenshot | https://manorrealestate.com/ |
| Charcot Immobilier | Homepage screenshot | https://www.charcot-immobilier.com/ |
| Lancastrian Estates | Website image | https://www.lancastrianestates.co.uk/content/uploads/2022/10/Meet-our-Team-Lancastrian-Estates.jpg |
| Kent Place | Homepage screenshot | https://www.kentplace.org/ |
| SGS | Homepage screenshot | https://sgs.org/ |
| Beacon Dermatology | Homepage screenshot | https://www.beaconderm.com/ |
| Pillway | Homepage screenshot | https://www.pillway.com/ |
| Jetts | Homepage screenshot | https://jetts.co.uk/ |
| Catering.com | Homepage screenshot | https://catering.com/ |

`node scripts/capture-portfolio.cjs --missing-global` captures only global entries that have a public URL and no thumbnail. Successful captures update their thumbnail path and alternative text; failures retain the existing entry. Inspect captures before using them, since external sites can show overlays or change content.
