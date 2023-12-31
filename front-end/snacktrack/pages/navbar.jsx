import Link from "next/link";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "@/contexts/user_context";
import { getBusiness, getCustomer } from "@/api";
import { useRouter } from "next/router";

export default function NavBar() {
  const [isActive, setIsActive] = useState(false);
  const { activeUser, setActiveUser } = useContext(UserContext);
  const router = useRouter();

  function handleLogout(e) {
    window.localStorage.removeItem("user");
    alert("logged out");
    setActiveUser("");
    router.push("/");
  }

  useEffect(() => {
    if (activeUser === "") {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) {
        if ("business_name" in storedUser) {
          getBusiness(storedUser._id).then((business) => {
            window.localStorage.setItem("user", JSON.stringify(business));
            setActiveUser(JSON.parse(localStorage.getItem("user")));
          }).catch(err => {
            console.log(err)
            window.localStorage.removeItem("user")
          })
        } else {
          getCustomer(storedUser._id).then((customer) => {
            window.localStorage.setItem("user", JSON.stringify(customer));
            setActiveUser(JSON.parse(localStorage.getItem("user")));
          }).catch(err => {
            console.log(err)
            window.localStorage.removeItem("user")
          })
        }
      }

      console.log(activeUser, "activeuser");
    }
  }, [activeUser]);

  return (
    <nav
      className={"navbar is-spaced"}
      role={"navigation"}
      aria-label={"main navigation"}
    >
      <div className={"navbar-brand"}>
        <figure className={"image mr-6 mb-auto is-128x128"}>
          <Link href="/">
            <img
              id={"nav-logo"}
              src={"https://i.ibb.co/pL24QMX/snacktrack-logo.png"}
              alt={"SnackTrack logo"}
            />
          </Link>
        </figure>
        <a
          role="button"
          className={`navbar-burger ${isActive ? "is-active" : ""}`}
          data-target="main-nav-bar"
          onClick={() => {
            setIsActive(!isActive);
          }}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div
        id={"main-nav-bar"}
        className={`navbar-menu is-size-5 ${isActive ? "is-active" : ""}`}
      >
        <div className={"navbar-start mb-6"}>
          <Link href={"/"} className={"navbar-item"}>
            <p>Home</p>
          </Link>
          <Link href={"/map"} className={"navbar-item"}>
            <p>Map</p>
          </Link>
          <Link href={"/businesses"} className={"navbar-item"}>
            <p>Businesses</p>
          </Link>
        </div>
        <div className="navbar-end mb-6">
          <div className="navbar-item has-dropdown is-hoverable is-right">
            <a className={"navbar-link mr-3 mb-auto"}>
              {activeUser ? activeUser.username : "not logged in"}
            </a>
            <div className="navbar-dropdown is-danger">
              {!activeUser ? (
                <div>
                  <Link href={"/login/customerlogin"} className="navbar-item">
                    Customer Login
                  </Link>
                  <Link href={"/login/driverlogin"} className="navbar-item">
                    Driver Login
                  </Link>
                </div>
              ) : (
                <a className="navbar-item" onClick={handleLogout}>
                  Logout
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
