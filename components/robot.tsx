import Image from "next/image";
type Props = { small?: boolean; waving?: boolean; warm?: boolean };
/** One pearl-shell mascot shared by navigation, section art and the hero. */
export function Robot({ small = false, waving = false, warm = false }: Props) {
  return (
    <div
      className={`robot ${small ? "robot-small" : ""} ${waving ? "robot-wave" : ""} ${warm ? "robot-warm" : ""}`}
      aria-hidden="true"
    >
      <Image
        className="robot-render"
        src={warm ? "/images/mascot-sunset.png" : "/images/mascot-pearl.png"}
        alt=""
        width={240}
        height={240}
        sizes={small ? "95px" : "150px"}
      />
    </div>
  );
}
