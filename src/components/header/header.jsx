import React from "react";
import styles from "./header.module.scss";

const Header = ({ score }) => {
  return (
    <div className={styles.container}>
      <img src="/assets/images/logo-bonus.svg" alt="Logo" />
      <div className={styles.score_container}>
        <span className={styles.scoreText}>SCORE</span>
        <span className={styles.score}>{score}</span>
      </div>
    </div>
  );
};

export default Header;
