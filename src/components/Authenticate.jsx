import { useState } from 'react'

export default function Authenticate({ token }) {
  const [successMessage, setSuccessMessage] = useState(null);
  const [usernameMessage, setUsernameMessage] = useState(null);
  const [error, setError] = useState(null);

  const API = 'https://fsa-jwt-practice.herokuapp.com/'

  const handleClick = async (e) => {
    e.preventDefault();
    console.log("Event Clicked");
    try {
      let res = await fetch(API + "authenticate", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
      });

      const result = await res.json();
      console.log(result);
      setSuccessMessage(result.message)
      setUsernameMessage(result.data.username)

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Authenticate</h2>
      {successMessage && <p>{successMessage}</p>}
      {error && <p>{error}</p>}
      {usernameMessage && <p>Username: {usernameMessage}</p>}
      <button onClick={handleClick}>Authenticate Token</button>
    </div>
  );
}
