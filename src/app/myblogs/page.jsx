"use client";

import styles from "./myBlogs.module.css";
import Pagination from "@/components/pagination/Pagination";
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
    `http://localhost:3000/api/myblogs?page=${page}`,
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
      <Pagination page={page} hasPrev={hasPrev} hasNext={hasNext} />
    </div>
  );
};

export default MyBlogs;
