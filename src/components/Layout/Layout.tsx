import { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

import globalStyles from "../../pages/index.module.scss";
import styles from "./Layout.module.scss";

export type Props = {
  children: ReactNode;
  title?: string;
};

const Layout = ({ children, title }: Props) => (
  <>
    <header className={styles.navbar}>
      <nav title="home">
        <Link href="/" className={styles.navbarBrand}>
          <span className={globalStyles.logo}>
            <Image
              src="/dojo-logo-sm.png"
              alt="dojo-small"
              width={50}
              height={50}
              style={{
                maxWidth: "100%",
                height: "auto",
                objectPosition: "absolute",
              }}
            />
          </span>
        </Link>
        <span className={styles.navbarText}>{title}</span>
      </nav>
    </header>
    <div>{children}</div>
    <footer className={styles.footer}>
      <span style={{ fontSize: 20 }}>Dojo Demo App Powered by</span>&nbsp;&nbsp;
      <span className={globalStyles.logo}>
        <Image
          src="/liatrio.png"
          alt="Liatrio"
          width={96}
          height={53}
          style={{
            maxWidth: "100%",
            height: "auto",
            objectPosition: "absolute",
          }}
        />
      </span>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <Link href="/about">
        <span style={{ fontSize: 20, color: "lightgreen" }}>| About |</span>
      </Link>
    </footer>
  </>
);

export default Layout;
