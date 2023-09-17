"use client";

import React, { useState } from "react";
import styles from "./comments.module.css";
import Link from "next/link";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import Comment from "../comment/Comment";
import { TailSpin } from "react-loader-spinner";

const fetcher = async (url) => {
  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok) {
    const error = new Error(data.message);
    throw error;
  }

  return data;
};

const Comments = ({ postSlug }) => {
  const [desc, setDesc] = useState("");

  const session = useSession();
  const { status } = session;

  const { data, mutate, isLoading } = useSWR(
    `https://i-blog-ssc369.vercel.app//api/comments?postSlug=${postSlug}`,
    fetcher
  );

  const handleSubmit = async () => {
    await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({ desc, postSlug }),
    });

    mutate(); // by using this mutate data is updated on display without re render just like websocket case
    setDesc("");
  };

  const commentAuthentication = (status) => {
    return (
      <>
        {status === "authenticated" ? (
          <div className={styles.write}>
            <input
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
              placeholder="write a comment..."
              className={styles.input}
            />
            <button onClick={handleSubmit} className={styles.button}>
              Send
            </button>
          </div>
        ) : (
          <div className={styles.link}>
            <Link
              style={{
                color: "crimson",
                fontWeight: "600",
                letterSpacing: "1px",
              }}
              href="/login"
            >
              Login to write a comment
            </Link>
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

  const renderComments = () => {
    return (
      <>
        {data.length > 0 ? (
          <>
            <h1 className={styles.title}>Comments</h1>
            {data?.map((item) => (
              <Comment mutate={mutate} key={item.id} item={item} />
            ))}
          </>
        ) : (
          <h1 className={styles.empty}>No Comments</h1>
        )}
      </>
    );
  };

  return (
    <div className={styles.container}>
      {status === "loading" ? renderLoading() : commentAuthentication(status)}

      <div className={styles.comments}>
        {isLoading ? renderLoading() : renderComments()}
      </div>
    </div>
  );
};

export default Comments;
