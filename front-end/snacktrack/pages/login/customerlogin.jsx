import NavBar from "../navbar";
function handleSubmit(e) {
  e.preventDefault();}

export default function CustomerLogin() {
  return (
    <>
      <NavBar />
      <br></br>
      <h1>Customer Login</h1>
      <br></br>

      <form>
        <label htmlFor="username_input">
          Username
          <input type="text" name="username_input" id="username_input"></input>
        </label>

        <label htmlFor="password_input">
          Password
          <input type="text" name="password_input" id="password_input"></input>
        </label>
        <button onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </>
  );
}
