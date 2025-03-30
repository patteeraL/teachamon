import styles from "@/styles/Onboarding.module.css";
import Head from "next/head";
import { useEffect, useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import InputMonName from "@/components/input_name";
import { useRouter } from "next/router"; // Import useRouter

export default function Mon() {
  const [selectedMon, setSelectedMon] = useState("");
  const [userId, setUserId] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter(); // Initialize router

  useEffect(() => {
    // Retrieve the selected monster and user ID from localStorage
    const storedMonId = localStorage.getItem("monId");
    const storedUserId = localStorage.getItem("userId");

    if (storedMonId) setSelectedMon(storedMonId);
    if (storedUserId) setUserId(storedUserId);
  }, []);

  const handleSaveName = async (Monname) => {
    if (!userId || !selectedMon || !Monname) {
      setError("User ID, Selected Monster, or Name is missing!");
      console.error(error);
      return;
    }

    try {
      // Update the monster's name in the database
      const { data, error } = await supabase
        .from("monsters")
        .update({ name: Monname }) // Update the name field
        .eq("user_id", userId) // Match the user ID
        .eq("monster_type", selectedMon); // Match the selected monster type

      if (error) {
        console.error("Supabase Update Error:", error.message);
        setError(error.message);
        return;
      }

      console.log("Monster name updated successfully:", data);

      // Save the updated monster name to localStorage
      localStorage.setItem("Monname", Monname);

      // Redirect to the home page
      router.push("/home");
    } catch (err) {
      console.error("Error updating monster name:", err.message);
      setError(err.message);
    }
  };

  return (
    <>
      <Head>
        <title>Onboarding | Teachamon</title>
        <meta name="keyword" content="" />
      </Head>
      <div className={styles.container}>
        <h2>Let's Give it a Name!</h2>
        <div className={styles.avatar}>
          <img
            src={selectedMon === "mon1" ? "/mon1.gif" : "/mon2.gif"}
            width={258}
            height={258}
            alt={selectedMon}
          />
        </div>
        {/* Use the InputMonName component */}
        <InputMonName onSave={handleSaveName} />
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </>
  );
}