"use client";

import styles from "./myBlogs.module.css";
import Card from "@/components/card/Card";
import { TailSpin } from "react-loader-spinner";
import useSWR from "swr";
import Link from "next/link";

const MyBlogs = (props) => {
  const { searchParams } = props;
  const page = parseInt(searchParams.page) || 1;

  const fetcher = async (url) => {
    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok) {
      const error = new Error(data.message);
      throw error;
    }

    return data;
  };

  const { data, mutate, isLoading } = useSWR(
    `https://i-blog-ssc369.vercel.app/api/myblogs?page=${page}`,
    fetcher
  );

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
          <div className={styles.empty}>
            <h1>
              <Link href="/write">Create a Blog . . .</Link>
            </h1>
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
        My
        <span style={{ color: "crimson" }}> B</span>logs
      </h1>
      {isLoading ? renderLoading() : renderPosts(data?.posts)}
    </div>
  );
};

export default MyBlogs;
