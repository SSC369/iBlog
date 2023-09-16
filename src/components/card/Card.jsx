"use client";

import React from "react";
import styles from "./card.module.css";
import Link from "next/link";
import Image from "next/image";
import { AiOutlineDelete } from "react-icons/ai";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Card = ({ item, mutate }) => {
  const session = useSession();
  const router = useRouter();

  if (!session) {
    router.replace("/login");
  } else {
  }

  const handleDelete = async () => {
    console.log(item);
    await fetch(`/api/posts/${item.id}`, {
      method: "DELETE",
    });
    mutate();
  };

  return (
    <div className={styles.container}>
      {item.img && (
        <div className={styles.imageContainer}>
          <Image
            placeholder="blur"
            blurDataURL={item.img}
            src={item.img}
            alt="image"
            fill
            sizes="(max-height: 300px) 300px"
            style={{ objectFit: "contain" }}
          />
        </div>
      )}

      <div className={styles.textContainer}>
        <div className={styles.details}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Link href={`/posts/${item.slug}`}>
              <h1 className={styles.title}>{item.title} </h1>
            </Link>
            {item.userEmail === session?.data?.user.email && (
              <button
                onClick={() => handleDelete(item.id)}
                type="button"
                className="transparent-button"
              >
                <AiOutlineDelete className={styles.icon} fontSize={24} />
              </button>
            )}
          </div>

          <p className={styles.desc}>{item.desc}</p>
        </div>
        <Link className={styles.link} href={`/posts/${item.slug}`}>
          Read More
        </Link>
      </div>
    </div>
  );
};

export default Card;
