"use client";

import { useState } from "react";
import { Check, Circle, Leaf, Plus } from "lucide-react";

const products = [{ title: "朝のマグカップ", category: "食器", text: "暮らしの始まりに、手になじむかたち。" }, { title: "リネンクロス", category: "布もの", text: "毎日使うものに、やさしい手触りを。" }, { title: "小さなプレート", category: "食器", text: "いつもの食卓に、少しの余白を。" }];
const initialTasks = [{ id: 1, title: "トップページの構成を確認", owner: "デザイン", done: false }, { id: 2, title: "問い合わせの入力項目を整理", owner: "開発", done: false }, { id: 3, title: "掲載素材を準備", owner: "チーム", done: true }];

export function ConceptDemo({ brand }: { brand: string }) {
  const [category, setCategory] = useState("すべて");
  const [tasks, setTasks] = useState(initialTasks);
  const [onlyOpen, setOnlyOpen] = useState(false);
  const [entry, setEntry] = useState("");
  const [entries, setEntries] = useState<string[]>([]);
  const [status, setStatus] = useState("");
  if (!["mori.", "flow", "日々、"].includes(brand)) return null;
  return <section className={`concept-demo demo-${brand === "日々、" ? "hibi" : brand.replace(".", "")}`} aria-label={`${brand}の操作デモ`}><div className="demo-topline"><strong>{brand}</strong><span>操作できるデモ / 架空データ</span></div>
    {brand === "mori." ? <><div className="demo-brand-head"><Leaf size={28} /><h3>暮らしに、少しの余白を。</h3><p>商品をカテゴリで探してみてください。</p></div><div className="demo-filters" role="group" aria-label="商品のカテゴリ">{["すべて", "食器", "布もの"].map(value => <button key={value} aria-pressed={category === value} onClick={() => setCategory(value)}>{value}</button>)}</div><div className="demo-products">{products.filter(product => category === "すべて" || product.category === category).map(product => <article key={product.title}><div className={`demo-object demo-object-${products.indexOf(product)}`} aria-hidden="true" /><small>{product.category}</small><h4>{product.title}</h4><p>{product.text}</p></article>)}</div><p role="status">{products.filter(product => category === "すべて" || product.category === category).length}点を表示しています。</p></> : brand === "flow" ? <><h3>今日のチームの仕事</h3><p className="demo-progress">{tasks.filter(task => task.done).length} / {tasks.length} 件完了</p><label className="demo-filter-toggle"><input type="checkbox" checked={onlyOpen} onChange={event => setOnlyOpen(event.target.checked)} />未完了だけ表示</label><ul className="demo-tasks">{tasks.filter(task => !onlyOpen || !task.done).map(task => <li key={task.id}><button aria-pressed={task.done} aria-label={`${task.title}を${task.done ? "未完了" : "完了"}にする`} onClick={() => setTasks(current => current.map(item => item.id === task.id ? { ...item, done: !item.done } : item))}>{task.done ? <Check size={20} /> : <Circle size={20} />}</button><span>{task.title}<small>{task.owner}</small></span><b>{task.done ? "完了" : "進行中"}</b></li>)}</ul>{onlyOpen && tasks.every(task => task.done) && <p role="status">すべてのタスクが完了しました。</p>}</> : <><h3>今日の小さなできごと</h3><p>ひと言から、記録を残してみましょう。</p><label className="demo-entry-label" htmlFor="demo-entry">今日の記録</label><textarea id="demo-entry" maxLength={200} rows={3} value={entry} onChange={event => setEntry(event.target.value)} placeholder="今日はどんな一日でしたか？" /><button className="catalog-outline-button" disabled={!entry.trim()} onClick={() => { setEntries(current => [entry.trim(), ...current]); setEntry(""); setStatus("この画面に記録を追加しました。"); }}><Plus size={16} />記録を追加</button><p role="status">{status}</p><ul className="demo-entries">{entries.map((text, index) => <li key={index}>{text}</li>)}</ul></>}
    <small className="demo-disclosure">この画面内でのみ動作する自主制作デモです。操作・記録はサーバーに保存されず、閉じるとリセットされます。実際の顧客案件や成果を示すものではありません。</small>
  </section>;
}
