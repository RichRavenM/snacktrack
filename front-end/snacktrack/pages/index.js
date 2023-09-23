import Head from "next/head";
// import { Inter } from "next/font/google";
import NavBar from "./navbar";
import LoginButtonCustomer from "./customer_login";
import LoginButtonDriver from "./driver_login";
import CreateCustomerProfile from "./customercreate";
import CreateDriverProfile from "./drivercreate";

// const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title class="subtitle is-5">SnackTrack</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script src="https://kit.fontawesome.com/a1a2d1f110.js" crossOrigin="anonymous"/>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main id={"home-page"}>
        <section id={"main-page-hero"} className="hero is-fullheight ">
          <div className={"hero-head"}>
            <NavBar/>
            <br/>
            <br/>
            <p className="title has-text-centered is-size-1 pb-5">
              SnackTrack
            </p>
            <p className="subtitle has-text-centered">
              A community of food right on your doorstep
            </p>
          </div>
          <div className="hero-foot has-text-centered pb-4">
            <div id={"links-button"}><a href={"#links"}><span className={"icon is-size-1"}><i
                className="fa-solid fa-angle-down"></i></span></a></div>
          </div>
        </section>
        <section className={"hero is-large"}>
          <div className={"hero-head"}>
            <br/><br/><br/>
            <p id={"links"} className={"title has-text-centered"}>To serve, or to be served?</p>
          </div>
          <div className={"hero-body"}>Sample text</div>
        </section>
      </main>
    </>
  );
}
