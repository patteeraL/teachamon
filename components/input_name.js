import { useEffect, useState } from 'react';
import { useRouter } from "next/router";
export default function InputMonName() {
    const [Monname, setMonname] = useState("");  
    const router = useRouter();
  
    useEffect(() => {
      
      localStorage.setItem('Monname', Monname);
    }, [Monname]);
      
    
    const handleSubmit = (event) => {
      event.preventDefault();  
      if (Monname.trim()) {
        router.push(`../home`);
        console.log("Name:", Monname);
      } else {
        alert("Please enter a name.");
      }
    };
    return(
    <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="Monname"
                    className="input"
                    value={Monname}
                    onChange={(e) => setMonname(e.target.value)} 
                    placeholder="Name"
                />
                <button type="submit" className="mainbtn">
                    Submit
                </button>
            </form>
    )}