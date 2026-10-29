// Code-native package covers: a short heading and one clear product illustration.
const fs = require('node:fs');
const labels = ['更新しやすいサイト','伝わる紹介ページ','使いやすい通販','自分で更新できる','集客を育てる','軽やかな表示','情報をつなぐ','お店らしさを形に','販売の仕組みを整える','手のひらの体験','サービスを育てる','立体で伝える','日々の業務を整える','知識を仕事に生かす','手作業をつなぎ直す','技術の道筋を描く','検索から出会いへ','安心できる基盤','安全なつながり','ブランドをそろえる'];
const colors = [['#e6eaf5','#5267a0','#b7c4e7'],['#eee6f2','#79538f','#d3bbde'],['#e3eee8','#347365','#acd0bd'],['#f1e6df','#a1644c','#dfb9a3']];
const illustrations = [
 '<rect x="290" y="42" width="220" height="170" rx="14"/><path d="M290 76h220"/><circle cx="307" cy="59" r="3"/><circle cx="319" cy="59" r="3"/><rect x="307" y="94" width="80" height="98" rx="8"/><path d="M405 106h83M405 126h65M405 164h61M405 182h48"/>',
 '<rect x="315" y="35" width="150" height="190" rx="20"/><path d="M360 50h60M368 209h44"/><rect x="331" y="75" width="118" height="60" rx="8"/><path d="M335 155h100M335 172h72"/>',
 '<rect x="280" y="48" width="230" height="166" rx="14"/><path d="M280 80h230M299 103h40v89h-40zM355 161h25v31h-25zM394 131h25v61h-25zM433 107h25v85h-25z"/>',
 '<circle cx="395" cy="124" r="34"/><circle cx="304" cy="62" r="18"/><circle cx="491" cy="62" r="18"/><circle cx="304" cy="198" r="18"/><circle cx="491" cy="198" r="18"/><path d="M321 73l47 31M421 105l52-33M321 187l47-40M421 147l52 40"/>'
];
fs.mkdirSync('public/images/packages/previews',{recursive:true});
labels.forEach((label,i)=>{const [paper,ink,accent]=colors[i%4],id=`package-${String(i+1).padStart(2,'0')}`;
const drawing=illustrations[i<8?0:i===9?1:i%4];
const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="560" height="315" viewBox="0 0 560 315"><rect width="560" height="315" rx="22" fill="${paper}"/><circle cx="468" cy="80" r="130" fill="${accent}" opacity=".45"/><g stroke="${ink}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="${paper}" transform="translate(0,16)">${drawing}</g><text x="30" y="49" font-size="14" letter-spacing="2" font-family="sans-serif" fill="${ink}">大穂兄弟　制作プラン</text><rect x="20" y="234" width="520" height="61" rx="12" fill="${paper}"/><text x="31" y="274" font-size="27" font-weight="700" font-family="sans-serif" fill="${ink}">${label}</text><text x="31" y="107" font-size="38" font-family="serif" fill="${ink}" opacity=".8">${String(i+1).padStart(2,'0')}</text></svg>`;
fs.writeFileSync(`public/images/packages/previews/${id}.svg`,svg);});
console.log('Created 20 package covers.');
