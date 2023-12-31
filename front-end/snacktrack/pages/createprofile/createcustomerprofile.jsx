import NavBar from "../navbar";
import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { getCustomers, postCustomer } from "@/api";
import { UserContext } from "@/contexts/user_context";

export default function CreateCustomer() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");
  const [isEmailValid, setIsEmailValid] = useState("");
  const [doPasswordsMatch, setDoPasswordsMatch] = useState("");
  const [isAvatarUrlValid, setIsAvatarUrlValid] = useState("");
  const [customerUsernames, setCustomerUsernames] = useState([]);
  const [isUsernameValid, setIsUsernameValid] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState("");
  const { activeUser, setActiveUser } = useContext(UserContext);
  const router = useRouter();

  if (activeUser) {
    router.push("/map")
  }

  if (activeUser) {
    return (<>
      <NavBar/>
      <br/><br/>
      <h1 className={"title has-text-centered"}>Already logged in! Redirecting...</h1>
    </>)
  }

  useEffect(() => {
    getCustomers().then((customers) => {
      const usernames = customers.map((customer) =>
        customer.username.toLowerCase()
      );
      setCustomerUsernames(usernames);
    });
  }, []);

  function handleUserNameChange(e) {
    setUserName(e.target.value);
    if (e.target.value.length > 0) {
      if (
        e.target.value.length >= 5 &&
        e.target.value.length < 16 &&
        !customerUsernames.some(
          (username) => username === e.target.value.toLowerCase()
        )
      ) {
        setIsUsernameValid(true);
      } else {
        setIsUsernameValid(false);
      }
    } else {
      setIsUsernameValid("");
    }
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
    if (
      /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(e.target.value)
    ) {
      setIsEmailValid(true);
    } else if (e.target.value.length === 0) {
      setIsEmailValid("");
    } else {
      setIsEmailValid(false);
    }
  }
  function handleAvatarUrlChange(e) {
    setAvatarUrl(e.target.value);
    if (e.target.value.length > 0) {
      if (
        /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g.test(e.target.value)
      ) {
        setIsAvatarUrlValid(true);
      } else {
        setIsAvatarUrlValid(false);
      }
    } else {
      setIsAvatarUrlValid("");
    }
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
    if (e.target.value.length > 0) {
      if (e.target.value.length > 7 && e.target.value.length < 21) {
        setIsPasswordValid(true);
      } else {
        setIsPasswordValid(false);
      }
    } else {
      setIsPasswordValid("");
    }
  }
  function handlePasswordConfirmChange(e) {
    setPasswordConfirm(e.target.value);
    if (e.target.value.length > 0) {
      if (e.target.value === password) {
        setDoPasswordsMatch(true);
      } else {
        setDoPasswordsMatch(false);
      }
    } else {
      setDoPasswordsMatch("");
    }
  }
  let path = "";
  if (password.length !== 0 && password === passwordConfirm) {
    path = "/map";
  } else {
    path = "";
  }

  function handleSubmit(e) {
    e.preventDefault();

    const customerProfile = {
      username: userName,
      email,
      password,
    };
    if (avatarUrl !== "") {
      customerProfile.avatar_url = avatarUrl;
    }
    postCustomer(customerProfile).then((response) => {
      console.log(response);
      const newCustomer = { ...customerProfile, _id: response._id };
      setActiveUser(newCustomer);
      window.localStorage.setItem("user", JSON.stringify(newCustomer));

      router.push("/");
    });
  }

  const isEverythingValid =
    isEmailValid === true &&
    isAvatarUrlValid !== false &&
    isPasswordValid === true &&
    isUsernameValid === true &&
    doPasswordsMatch === true;

  return (
    <>
      <NavBar />
      <h1 className={"title has-text-centered"}>Create Customer</h1>
      <br></br>
      <div className={"columns is-centered"}>
        <div className={"column is-one-third"}>
          <form className={"box"} onSubmit={handleSubmit}>
            <div className={"field"}>
              <label className={"label"} htmlFor="username_input">
                Username
              </label>
              <div className={"control"}>
                <input
                  className={"input"}
                  required={true}
                  type="text"
                  name="username_input"
                  placeholder="johnsmith1"
                  value={userName}
                  onChange={handleUserNameChange}
                ></input>
                {isUsernameValid === false ? (
                  <p>
                    Username must not already exist in the database and be
                    between 5 and 15 characters long
                  </p>
                ) : null}
              </div>
            </div>

            <div className={"field"}>
              <label className={"label"} htmlFor="email_input">
                Email
              </label>
              <div className={"control"}>
                <input
                  className={"input"}
                  required={true}
                  type="text"
                  name="email_input"
                  placeholder="example@domain.co.uk"
                  value={email}
                  onChange={handleEmailChange}
                ></input>
                {isEmailValid === false ? (
                  <p>Please enter a valid email</p>
                ) : null}
              </div>
            </div>

            <div className={"field"}>
              <label className={"label"} htmlFor="avatar_input">
                Avatar URL (Optional)
              </label>
              <div className={"control"}>
                <input
                  className={"input"}
                  required={false}
                  type="text"
                  name="avatar_input"
                  placeholder="https://www.photos.google.com/myimage.png"
                  value={avatarUrl}
                  onChange={handleAvatarUrlChange}
                ></input>
                {isAvatarUrlValid === false ? (
                  <p>Please enter a valid image url</p>
                ) : null}
              </div>
            </div>

            <div className={"field"}>
              <label className={"label"} htmlFor="password_input">
                Password
              </label>
              <div className={"control"}>
                <input
                  className={"input"}
                  required={true}
                  type="password"
                  name="password_input"
                  placeholder="password"
                  value={password}
                  onChange={handlePasswordChange}
                ></input>
                {isPasswordValid === false ? (
                  <p>Password must be between 8 and 20 characters long</p>
                ) : null}
              </div>
            </div>

            <div className={"field"}>
              <label className={"label"} htmlFor="password_confirm_input">
                Confirm Password
              </label>
              <div className={"control"}>
                <input
                  className={"input"}
                  required={true}
                  type="password"
                  name="password_confirm_input"
                  placeholder="password"
                  value={passwordConfirm}
                  onChange={handlePasswordConfirmChange}
                ></input>
              </div>
              {doPasswordsMatch === false ? <p>Passwords must match</p> : null}
            </div>

            <button
              className={"button"}
              type={"submit"}
              disabled={!isEverythingValid}
            >
              {/* <Link 
                href={{
                  //the variable path below is only correct if the password.length !==0 and the password === passwordConfirm
                  pathname: `${path}`,
                }}
              > */}
              Submit
              {/* </Link> */}
            </button>

            <p>{passwordErrorMsg}</p>
          </form>
        </div>
      </div>
    </>
  );
}
