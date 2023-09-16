"use client";

import React, { useContext } from "react";
import styles from "./themeToggle.module.css";
import Image from "next/image";
import { ThemeContext } from "@/context/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggle } = useContext(ThemeContext);

  return (
    <div
      style={
        theme === "dark"
          ? { backgroundColor: "white" }
          : { backgroundColor: "#0f172a" }
      }
      className={styles.container}
      onClick={toggle}
    >
      <Image
        style={{ marginLeft: "2px" }}
        src="/moon.png"
        alt=""
        width={14}
        height={14}
      />
      <div
        style={
          theme === "dark"
            ? { left: 1, backgroundColor: "#0f172a" }
            : { backgroundColor: "white", right: 1 }
        }
        className={styles.ball}
      ></div>
      <Image
        style={{ marginRight: "2px" }}
        src="/sun.png"
        alt=""
        width={14}
        height={14}
      />
    </div>
  );
};

export default ThemeToggle;
