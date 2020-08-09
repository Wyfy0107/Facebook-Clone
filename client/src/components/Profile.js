import React from "react";
import axios from "axios";

function Profile() {
  const logOut = () => {
    axios
      .post("/logout")
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  return (
    <div>
      <h1>Profile page</h1>
      <button onClick={logOut}>Log out</button>
    </div>
  );
}

export default Profile;
