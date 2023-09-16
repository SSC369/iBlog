import React from "react";
import styles from "./singlePage.module.css";
import Image from "next/image";
import Comments from "@/components/comments/Comments";

const getData = async (slug) => {
  const res = await fetch(
    `https://i-blog-ssc369.vercel.app/api/posts/${slug}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed");
  }
  return res.json();
};

const SinglePage = async ({ params }) => {
  const { slug } = params;
  const { post } = await getData(slug);

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.textContainer}>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h1 className={styles.title}>{post?.title}</h1>
              {/*TODO: edit post */}
            </div>

            <p className={styles.description}>{post?.desc}</p>
          </div>
          <div className={styles.user}>
            {post?.user?.image && (
              <div className={styles.userImageContainer}>
                <Image
                  src={post.user.image}
                  alt="user"
                  fill
                  sizes="(max-width: 40px) 40px"
                  className={styles.avatar}
                />
              </div>
            )}
            <div className={styles.userTextContainer}>
              <span className={styles.username}>{post?.user.name}</span>
              <span className={styles.date}>
                {post?.createdAt.substring(0, 10)}
              </span>
            </div>
          </div>
        </div>
        {post?.img && (
          <div className={styles.imageContainer}>
            <img src={post?.img} className={styles.postImage} />
          </div>
        )}
      </div>
      <hr />
      <div className={styles.post}>
        <div className={styles.comment}>
          <Comments postSlug={slug} />
        </div>
      </div>
    </div>
  );
};

export default SinglePage;
