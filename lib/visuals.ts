export const scenes = {
  solo: {
    src: "/images/dream-solo.png",
    people: 1,
    alt: "タブレットを手にした1人と、カラフルな髪のロボット。コーラルとブルーの光が差し込むイメージ。",
  },
  duo: {
    src: "/images/dream-duo.png",
    people: 2,
    alt: "2人がタブレットと色見本を囲み、ロボットと一緒にアイデアを考えるイメージ。",
  },
  trio: {
    src: "/images/dream-trio.png",
    people: 3,
    alt: "3人がムードボードを見ながらアイデアを話し合う、ロボットのいるスタジオのイメージ。",
  },
  quartet: {
    src: "/images/dream-four.png",
    people: 4,
    alt: "参照画像の4人が色見本とタブレットを囲む、光のリボンに包まれたチームビジュアル。",
  },
} as const;
export type SceneVariant = keyof typeof scenes;
