import { useState } from "react";

function UsernameForm({ addUsername }) {
  const [username, setUsername] = useState('');

  function handleTaskInputChange(e) {
    setUsername(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    addUsername(username);
  }

  return(
    <form onSubmit={handleSubmit}>
      <input
        name = "username"
        type = "text"
        value = {username}
        onChange = {handleTaskInputChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

 export default UsernameForm;