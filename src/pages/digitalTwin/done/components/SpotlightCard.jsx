import { useRef } from "react";
import styles from "./SpotlightCard.module.css";

const SpotlightCard = ({
  children,
  className = "",
  spotlightColor = "rgba(255, 255, 255, 0.1)",
  title = "",
}) => {
  const divRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = divRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    divRef.current.style.setProperty("--mouse-x", `${x}px`);
    divRef.current.style.setProperty("--mouse-y", `${y}px`);
    divRef.current.style.setProperty("--spotlight-color", spotlightColor);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      className={`${styles["card-spotlight"]} ${className} m-2 p-4`}
    >
      <div
        style={{
          background: "url(/digitaltwin/done/title.png) no-repeat",
          backgroundSize: "100% 100%",
        }}
        className="text-sl pl-20 font-bold text-white"
      >
        <div className={`${styles.diyfont}`}>{title}</div>
      </div>
      {children}
    </div>
  );
};

export default SpotlightCard;
