"use client";
import Link from "next/link";
import styles from "./authLinks.module.css";
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { signOut, useSession } from "next-auth/react";
import { useParams, usePathname, useRouter } from "next/navigation";

const AuthLinks = () => {
  const [open, setOpen] = useState(false);

  const path = usePathname();

  const { status } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    router.push("/");
    await signOut();
  };

  return (
    <div>
      <Link
        style={{
          borderBottom: `${path === "/" ? "2px solid crimson" : ""}`,
        }}
        href="/"
        className={styles.link}
      >
        Homepage
      </Link>
      {status === "unauthenticated" ? (
        <Link
          style={{
            borderBottom: `${path === "/login" ? "2px solid crimson" : ""}`,
          }}
          href="/login"
          className={styles.link}
        >
          Login
        </Link>
      ) : (
        <>
          <Link
            style={{
              borderBottom: `${path === "/write" ? "2px solid crimson" : ""}`,
            }}
            href="/write"
            className={styles.link}
          >
            Write
          </Link>

          <Link
            style={{
              borderBottom: `${path === "/myblogs" ? "2px solid crimson" : ""}`,
            }}
            href="/myblogs"
            className={styles.link}
          >
            My Blogs
          </Link>
          <span onClick={handleLogout} className={styles.link}>
            Logout
          </span>
        </>
      )}
      <RxHamburgerMenu
        className={styles.burger}
        fontSize={24}
        onClick={() => setOpen(!open)}
      />

      {open && (
        <div className={styles.responsiveMenu}>
          <Link
            style={{
              borderBottom: `${path === "/" ? "2px solid crimson" : ""}`,
            }}
            href="/"
            onClick={() => setOpen(!open)}
          >
            Homepage
          </Link>

          {status === "unauthenticated" ? (
            <Link
              style={{
                borderBottom: `${path === "/login" ? "2px solid crimson" : ""}`,
              }}
              href="/login"
              onClick={() => setOpen(!open)}
            >
              Login
            </Link>
          ) : (
            <>
              <Link
                style={{
                  borderBottom: `${
                    path === "/write" ? "2px solid crimson" : ""
                  }`,
                }}
                href="/write"
                onClick={() => setOpen(!open)}
              >
                Write
              </Link>
              <Link
                style={{
                  borderBottom: `${
                    path === "/myblogs" ? "2px solid crimson" : ""
                  }`,
                }}
                href="/myblogs"
                onClick={() => setOpen(!open)}
              >
                My Blogs
              </Link>
              <span onClick={handleLogout}>Logout</span>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default AuthLinks;
