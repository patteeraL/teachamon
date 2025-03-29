import { useState } from "react";

export default function InputMonName({ onSave }) {
  const [Monname, setMonname] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (Monname.trim()) {
      onSave(Monname); // Call the onSave function passed as a prop
    } else {
      alert("Please enter a name.");
    }
  };

  return (
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
  );
}