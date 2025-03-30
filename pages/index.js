import { useState } from "react";
import styles from "@/styles/Login.module.css";
import Head from "next/head";
import Image from "next/image";
import InputLogin from "@/components/input_login"; 

export default function Index() {
  const [showLoginForm, setShowLoginForm] = useState(null);  

  const handleLoginClick = () => {
    setShowLoginForm("login"); 
  };

  const handleSignUpClick = () => {
    setShowLoginForm("signup");  
  };

  return (
    <>
      <Head>
        <title>Login | Teachamon</title>
        <meta name="keyword" content="" />
      </Head>
      <div className={styles.container}>
        

      <h5>The Adventure of</h5>
      <h1>TEACHAMON</h1>
        {showLoginForm && <InputLogin formType={showLoginForm} />}

        
        {!showLoginForm && (
          <>
          <img src="mon2.gif" width={246} height={246} alt="icon"/>
            <button className={styles.loginbtn} onClick={handleLoginClick}>
              Log in
            </button>
            <button className={styles.signupbtn} onClick={handleSignUpClick}>
              Sign up
            </button>
          </>
        )}
      </div>
    </>
  );
}
