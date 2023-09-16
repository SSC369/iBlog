"use client";

import Image from "next/image";
import styles from "./writePage.module.css";
import { useEffect, useState } from "react";
import "react-quill/dist/quill.bubble.css";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "@/utils/firebase";
import { BsFillImageFill, BsUpload, BsCameraVideo } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import { v4 } from "uuid";

const WritePage = () => {
  const { status } = useSession();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [media, setMedia] = useState("");

  const [desc, setDesc] = useState("");
  const [title, setTitle] = useState("");

  const isAuthenticated = (status) => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  };

  useEffect(() => {
    isAuthenticated(status);
  }, []);

  useEffect(() => {
    const storage = getStorage(app);
    const upload = () => {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, name);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setMedia(downloadURL);
          });
        }
      );
    };

    file && upload();
  }, [file]);

  if (status === "loading") {
    return <div className={styles.loading}>Loading...</div>;
  }

  const handleSubmit = async () => {
    if (desc && title) {
      const res = await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify({
          title,
          desc,
          img: media,
          slug: v4(),
        }),
      });

      if (res.status === 200) {
        const data = await res.json();
        router.push(`/posts/${data.slug}`);
      }
    } else {
      alert("Write blog details !!!");
    }
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Title"
        className={styles.input}
        onChange={(e) => setTitle(e.target.value)}
      />

      <div className={styles.editor}>
        <button className={styles.button} onClick={() => setOpen(!open)}>
          <AiOutlinePlus className={styles.icon} fontSize={24} />
        </button>
        {open && (
          <div className={styles.add}>
            <input
              style={{ display: "none" }}
              type="file"
              id="image"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <button className={styles.addButton}>
              <label htmlFor="image">
                <BsFillImageFill className={styles.icon} fontSize={24} />
              </label>
            </button>
            <button className={styles.addButton}>
              <BsUpload className={styles.icon} fontSize={24} />
            </button>
            <button className={styles.addButton}>
              <BsCameraVideo className={styles.icon} fontSize={24} />
            </button>
          </div>
        )}
        {media && (
          <Image
            style={{ objectFit: "contain" }}
            src={media}
            alt=""
            width={300}
            height={300}
          />
        )}
      </div>
      <textarea
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        placeholder="Tell your story..."
        className={styles.descInput}
        rows={8}
        cols={20}
      />
      {desc && title && (
        <button className={styles.publish} onClick={handleSubmit}>
          Publish
        </button>
      )}
    </div>
  );
};

export default WritePage;
