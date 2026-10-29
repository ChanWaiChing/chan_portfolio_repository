const fs=require('node:fs');
const input=process.argv[2] ? fs.readFileSync(process.argv[2],'utf8') : fs.readFileSync(0,'utf8');
const totals=new Map();
for(const line of input.split(/\r?\n/)) {
  try {
    const event=JSON.parse(line.slice(line.indexOf('{')));
    if(event.type!=='site_interaction'||!/^\d{4}-\d{2}-\d{2}$/.test(event.day))continue;
    const key=JSON.stringify([event.day,event.name,event.id||'全体']);
    totals.set(key,(totals.get(key)||0)+1);
  } catch { /* Hosting logs may contain unrelated lines. */ }
}
console.log(JSON.stringify([...totals].map(([key,count])=>{const [day,event,target]=JSON.parse(key);return {日付:day,操作:event,対象:target,件数:count};}),null,2));
