"use client";

import React, { useEffect, useState } from "react";
import styles from "./comment.module.css";
import Image from "next/image";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useSession } from "next-auth/react";

const Comment = (props) => {
  const [edit, setEdit] = useState(false);
  const [options, setOptions] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const { item, mutate } = props;

  const session = useSession();

  const { data } = session;

  useEffect(() => {
    setCommentValue(item.desc);
  }, []);

  const handleSave = async () => {
    await fetch(`/api/comments/${item.id}`, {
      method: "PUT",
      body: JSON.stringify(commentValue),
    });
    setEdit(false);
    setOptions(false);
    mutate();
  };

  const handleDelete = async () => {
    await fetch(`/api/comments/${item.id}`, {
      method: "DELETE",
    });
    mutate();
  };

  const handleEdit = () => {
    setEdit(!edit);
    setOptions(false);
  };

  return (
    <div key={item.id} className={styles.comment}>
      <div className={styles.commentWrapper}>
        <div className={styles.user}>
          {item?.user?.image && (
            <div className={styles.userImageContainer}>
              <Image
                src={item?.user?.image}
                alt="user"
                fill
                sizes="(max-width: 40px) 40px"
                className={styles.image}
              />
            </div>
          )}
          <div className={styles.userInfo}>
            <span className={styles.username}>{item.user.name}</span>
            <span className={styles.date}>
              {item.createdAt.substring(0, 10)}
            </span>
          </div>
        </div>
        {options && (
          <ul className={styles.options}>
            <li
              style={{ color: edit ? "crimson" : "" }}
              onClick={handleEdit}
              className={styles.option}
            >
              Edit
            </li>

            <li onClick={handleDelete} className={styles.option}>
              Delete
            </li>

            {edit && (
              <li onClick={handleSave} className={styles.option}>
                Save
              </li>
            )}
          </ul>
        )}
        {data?.user?.email === item.userEmail && (
          <div onClick={() => setOptions(!options)} className={styles.dots}>
            <BsThreeDotsVertical />
          </div>
        )}
      </div>
      {!edit && <p className={styles.desc}>{item.desc}</p>}

      {edit && (
        <input
          value={commentValue}
          type="text"
          className={styles.commentEdit}
          onChange={(e) => setCommentValue(e.target.value)}
        />
      )}
    </div>
  );
};

export default Comment;
