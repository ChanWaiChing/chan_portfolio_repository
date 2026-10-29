const fs=require('node:fs');
// Include every current Japanese character, including dynamically rendered titles.
(async()=>{
 const paths=['components','lib'].flatMap(dir=>fs.readdirSync(dir).filter(file=>/\.(tsx|ts)$/.test(file)).map(file=>dir+'/'+file));
 const source=paths.map(path=>fs.readFileSync(path,'utf8')).join('');
 const japanese=[...new Set(source.match(/[\u3000-\u30ff\u3400-\u9fff\uff00-\uffef]/g))].join('');
 const ascii=Array.from({length:95},(_,i)=>String.fromCharCode(i+32)).join('');
 const css=await(await fetch('https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@600&display=swap&text='+encodeURIComponent(japanese+ascii))).text();
 const asset=css.match(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+)\)/)?.[1];
 if(!asset)throw Error('Font stylesheet did not contain an asset.');
 const bytes=Buffer.from(await(await fetch(asset)).arrayBuffer());
 if(bytes.subarray(0,4).toString('hex')!=='00010000')throw Error('Expected a TrueType font.');
 fs.writeFileSync('public/fonts/shippori-mincho-headings.ttf',bytes);
 const license=await(await fetch('https://raw.githubusercontent.com/google/fonts/main/ofl/shipporimincho/OFL.txt')).text();
 if(!license.includes('SIL OPEN FONT'))throw Error('Missing open font license');
 fs.writeFileSync('public/fonts/shippori-mincho-OFL.txt',license);
 console.log('Saved heading font:',bytes.length,'bytes;',japanese.length,'Japanese characters.');
})();
