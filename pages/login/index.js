import styles from "@/styles/Login.module.css"
import Head from "next/head";
import Link from "next/link";
export default function Index() {
  return (
    <>
    <Head>
      <title>Login | Teachamon</title>
      <meta name="keyword" content=""/>
    </Head>
    <div className={styles.container}><h3>The Adventure of</h3><h1>TEACHAMON</h1>
    <Link className="mainbtn" href="/onboarding">
          Log in
    </Link>
    </div>
    
    </>
  );
}