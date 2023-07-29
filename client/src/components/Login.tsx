import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    //this preserves the form when submitted
    e.preventDefault();

    // Send the username and password to the server for authentication
    fetch("http://localhost:5001/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Redirect the user to the home page
          Cookies.set("token", data.token);
          navigate("/", {
            state: {
              _id: data.account._id,
              fullName: data.account.fullName,
              userName: data.account.userName,
              email: data.account.email,
              friends: data.account.friends,
              chats: data.account.chats,
              notifications: data.account.notifications,
            },
          });
        } else {
          // Display an error message
          alert("Invalid username or password");
        }
      });
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>
        <button onClick={() => navigate("/signup")}>Signup</button>
      </form>
    </div>
  );
}
