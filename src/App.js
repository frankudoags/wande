import Home from "container/Home";
import Header from "layout/Header/Header";
import Footer from "layout/Footer/Footer";

import "bootstrap/dist/css/bootstrap.min.css";
import "assets/css/style.css";
import mainLogo from "assets/images/others/logo.png";
import { useEffect } from "react";
import { MoralisProvider } from "react-moralis"



function App() {
  useEffect(() => {
    //console.clear();
    console.warn = () => { };
  });
  return (
    <>
      <MoralisProvider
        appId='7IeTOs1s5htRvL6LGEDfMOlihq3O8ETBUQC2biv3'
        serverUrl='https://rlk0bebeeryq.usemoralis.com:2053/server' >
        <Header />
        <Home />
        <Footer />
        <GoToTop />
        <Loader />
      </MoralisProvider>
    </>
  );
}

// Website Loader
const Loader = () => {
  return (
    <div className="loader-wrapper">
      <div className="fixed-loading-wrapper">
        <div className="loader-wrapp">
          <div className="loader-logo">
            <img src={mainLogo} alt="" />
          </div>
          <div className="loader"></div>
        </div>
      </div>
    </div>
  );
};

// Go To Top
const GoToTop = () => {
  //
  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div onClick={goToTop} className="go-to-top" id="scrollToTop">
      <span>
        &#10138;
      </span>
    </div>
  );
};
export default App;
