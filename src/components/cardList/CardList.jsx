"use client";

import React from "react";
import styles from "./cardList.module.css";
import Card from "../card/Card";
import Pagination from "../pagination/Pagination";
import useSWR from "swr";

import { TailSpin } from "react-loader-spinner";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const fetcher = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  if (!res.ok) {
    const error = new Error(data.message);
    throw error;
  }
  return data;
};

const CardList = ({ page }) => {
  const session = useSession();
  const router = useRouter();

  if (!session) {
    router.push("/login");
  }

  const { data, mutate, isLoading } = useSWR(
    `https://i-blog-ssc369.vercel.app/api/posts?page=${page}`,
    fetcher
  );

  const POST_PER_PAGE = 2;

  const hasPrev = POST_PER_PAGE * (page - 1) > 0;
  const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < data?.count;

  const renderPosts = (posts) => {
    return (
      <>
        {posts?.length > 0 ? (
          <div className={styles.posts}>
            {posts?.map((item) => (
              <Card mutate={mutate} key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className={styles.posts}>
            <h1 className={styles.title}>Create a Blog</h1>
          </div>
        )}
      </>
    );
  };

  const renderLoading = () => {
    return (
      <div className="loading-container">
        <TailSpin
          height="40"
          width="40"
          color="#4fa94d"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass={styles.spin}
          visible={true}
        />
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <span style={{ color: "crimson" }}>B</span>logs
      </h1>
      {isLoading ? renderLoading() : renderPosts(data?.posts)}
      <Pagination page={page} hasPrev={hasPrev} hasNext={hasNext} />
    </div>
  );
};

export default CardList;
