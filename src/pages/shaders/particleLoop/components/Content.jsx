import styles from "./content.module.css";
// import { Component } from "react";

const StarBorder = ({
  as = "button",
  className = "",
  color = "white",
  speed = "6s",
  thickness = 1,
  children,
  ...rest
}) => {
  const Component = as;
  return (
    <Component
      className={`${styles["star-border-container"]} ${className}`}
      style={{
        padding: `${thickness}px 0`,
        ...rest.style,
      }}
      {...rest}
    >
      <div
        className={styles["border-gradient-bottom"]}
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      ></div>
      <div
        className={styles["border-gradient-top"]}
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      ></div>
      <div className={styles["inner-content"]}>{children}</div>
    </Component>
  );
};

export const Content = () => {
  return (
    <div className={styles.section}>
      <p className={styles.p1}>O P E N C O N T I N E N T S</p>
      <p className={styles.p2}>JULIUS ONAH</p>
      {/* <button className={styles.btn}>E N T E R</button> */}
      <StarBorder
        as="button"
        className="custom-class"
        speed="5s"
        children="E N T E R"
      />
    </div>
  );
};
