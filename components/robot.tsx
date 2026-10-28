type Props = { small?: boolean; waving?: boolean };
export function Robot({ small = false, waving = false }: Props) {
  return (
    <div
      className={`robot ${small ? "robot-small" : ""} ${waving ? "robot-wave" : ""}`}
      aria-hidden="true"
    >
      <div className="robot-antenna">
        <i />
      </div>
      <div className="robot-ear ear-left" />
      <div className="robot-ear ear-right" />
      <div className="robot-head">
        <div className="robot-face">
          <i className="eye" />
          <i className="eye" />
          <span className="robot-smile" />
          <b className="cheek cheek-left" />
          <b className="cheek cheek-right" />
        </div>
        <span className="head-shine" />
      </div>
      <div className="robot-neck" />
      <div className="robot-body">
        <span className="robot-heart">✦</span>
        <span className="robot-dot" />
      </div>
      <div className="robot-arm arm-left" />
      <div className="robot-arm arm-right" />
      <div className="robot-foot foot-left" />
      <div className="robot-foot foot-right" />
    </div>
  );
}
