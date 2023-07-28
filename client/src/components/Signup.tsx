import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    //this preserves the form when submitted
    e.preventDefault();

    //validate the data (not fully fleshed out)
    if (
      fullName.trim() == "" ||
      username.trim() == "" ||
      email.trim() == "" ||
      password.trim() == ""
    ) {
      alert("Please enter all fields");
    } else if (fullName.trim().split(" ").length != 2) {
      alert("Only enter one first name and one last name");
    } else if (
      !email.includes("@") ||
      !email.includes(
        ".com" ||
          email.trim().split("@")[0] == "" ||
          email.trim().split("@").length != 2
      )
    ) {
      alert("Enter a valid email address");
    } else {
      // Send the username and password to the server for authentication
      fetch("http://localhost:5001/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: username,
          password: password,
          email: email,
          fullName: fullName,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            // Redirect the user to the home page
            navigate("/");
          } else {
            // Display an error message
            alert(data.message);
          }
        });
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullname"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
