import Image from "next/image";
const pairs = [
  "参照画像の左側の2人：紺色のジャケットの人物と白い服の人物",
  "参照画像の右側の2人：紺色のニットの人物とベージュのジャケットの人物",
];
export function TeamPortrait() {
  return (
    <figure
      className="team-portrait reveal"
      data-people="4"
      aria-label="参照画像の4人全員を紹介するビジュアル"
    >
      <div className="team-portrait-grid">
        {pairs.map((alt, i) => (
          <div
            className="team-portrait-person"
            key={alt}
            style={{ "--pair-index": i } as React.CSSProperties}
          >
            <Image
              src="/images/four-person-team.png"
              alt={alt}
              fill
              sizes="(max-width:760px) 760px, 1400px"
            />
          </div>
        ))}
      </div>
      <figcaption>
        <span>ENGINEERING × DESIGN</span>
        <p>多様な視点が、ひとつのアイデアになる。</p>
      </figcaption>
    </figure>
  );
}
