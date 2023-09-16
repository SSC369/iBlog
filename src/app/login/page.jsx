"use client";

import { useRouter } from "next/navigation";
import styles from "./loginPage.module.css";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

const LoginPage = () => {
  const { status } = useSession();
  const router = useRouter();

  const isAuthenticated = (status) => {
    if (status === "authenticated") {
      router.push("/");
    } else {
      return <div className={styles.loading}>Loading..</div>;
    }
  };

  useEffect(() => {
    isAuthenticated(status);
  }, [status]);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div onClick={() => signIn("google")} className={styles.socialButton}>
          Sign in with Google
        </div>
        <div className={styles.socialButton}>Sign in with Github </div>
      </div>
    </div>
  );
};

export default LoginPage;
