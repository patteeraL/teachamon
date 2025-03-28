import styles from "@/styles/Onboarding.module.css"
import Head from "next/head";
import Image from "next/image";
import InputMonName from "@/components/input_name";
export default function Mon2() {
    return (
    <>
    <Head>
      <title>Onboarding | Teachamon</title>
      <meta name="keyword" content=""/>
    </Head>
    <div className={styles.container}><h2>Give it a name</h2>
    <div className={styles.avatar}><Image src="/mon2.svg" width={258} height={258} alt="mon2"/></div>
        <InputMonName/>
    </div>
    
    </>
  );
}