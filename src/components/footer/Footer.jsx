import React from "react";
import styles from "./footer.module.css";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div className={styles.logo}>
          <Image src="/sun.png" alt="iblog" width={50} height={50} />
          <h1 className={styles.logoText}>
            {" "}
            <span style={{ color: "crimson" }}>i</span>Blog
          </h1>
        </div>
        <p className={styles.desc}>
          iBlog is an online platform that empowers users to express their
          thoughts and ideas by creating and publishing blogs. With iBlog, users
          can easily compose and format their blog content, including titles and
          detailed articles, all within a user-friendly interface.
        </p>
        <div className={styles.icons}>
          <Image src="/facebook.png" alt="" width={18} height={18} />
          <Image src="/instagram.png" alt="" width={18} height={18} />
          <Image src="/tiktok.png" alt="" width={18} height={18} />
          <Image src="/youtube.png" alt="" width={18} height={18} />
        </div>
      </div>
    </div>
  );
};

export default Footer;
