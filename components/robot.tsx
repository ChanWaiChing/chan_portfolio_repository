import Image from "next/image";
type Props = {
  small?: boolean;
  waving?: boolean;
  warm?: boolean;
  variant?: "pearl" | "sunset" | "mint";
};
const robotArt = {
  pearl: "/images/mascot-pearl.png",
  sunset: "/images/mascot-spark.png",
  mint: "/images/mascot-mint.png",
};
/** Three related characters, each with its own silhouette and color palette. */
export function Robot({
  small = false,
  waving = false,
  warm = false,
  variant,
}: Props) {
  const character = variant ?? (warm ? "sunset" : "pearl");
  return (
    <div
      className={`robot ${small ? "robot-small" : ""} ${waving ? "robot-wave" : ""} ${warm ? "robot-warm" : ""}`}
      data-robot={character}
      aria-hidden="true"
    >
      <Image
        className="robot-render"
        src={robotArt[character]}
        alt=""
        width={240}
        height={240}
        sizes={small ? "95px" : "150px"}
      />
    </div>
  );
}
