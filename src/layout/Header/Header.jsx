// import logo from "assets/images/others/logo.png";
import { useState, useEffect, useRef } from "react";
import "./header.css";
import openseaImg from "assets/images/others/opensea.png";
import instaImg from "assets/images/others/insta.png";
import twitterImg from "assets/images/others/twitter.png";
import { useMoralis, useChain } from "react-moralis"
import Moralis from "moralis";

const Header = () => {

  const [isMobile, setIsMobile] = useState(false)

  const { enableWeb3, isWeb3Enabled, account, chainId } = useMoralis();

  const { switchNetwork } = useChain();

  useEffect(() => {
    if (isWeb3Enabled && chainId != "0x1") {
      switchN()
    }
  }, [isWeb3Enabled, enableWeb3, account])

  const switchN = async () => {
    await switchNetwork("0x1")// Switch to "0x1" for Mainnet
  }

  const headerRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("");

  useEffect(() => {
    if (window.innerWidth < 500) {
      setIsMobile(true)
    }
  }, [])

  // scroll to the section
  const scrollTo_Section = (sec_id) => {
    let element = document.getElementById(sec_id);
    const yOffset = open ? - 35 : 0;
    if (sec_id === "utility") {
      if (element) {
        const y = element.getBoundingClientRect().top + window.pageYOffset - 150;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    } else {
      if (element) {
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  };

  useEffect(() => {
    let sections = document.querySelectorAll(".sections");
    let current = "";
    let lastKnownScrollPosition = 0;
    let ticking = false;
    let btn = document.getElementById("scrollToTop");

    function doSomething(scrollPos) {
      //
      if (sections.length > 0) {
        sections.forEach((section) => {
          const sectionTop = section.offsetTop - 250;
          if (scrollPos >= sectionTop) {
            current = section.getAttribute("id");
            setActiveMenu(current);
          }
        });
      }

      //
      if (btn) {
        if (scrollPos > 500) {
          btn.classList.add("show-top");
        } else {
          btn.classList.remove("show-top");
        }
      }
    }

    document.addEventListener("scroll", function (e) {
      lastKnownScrollPosition = window.scrollY;
      if (!ticking) {
        window.requestAnimationFrame(function () {
          doSomething(lastKnownScrollPosition);
          ticking = false;
        });
        ticking = true;
      }
    });
    //
    window.onscroll = () => {
      if (sections.length > 0) {
        sections.forEach((section) => {
          const sectionTop = section.offsetTop - 250;
          if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
            setActiveMenu(current);
          } else {
            setActiveMenu("");
          }
        });
      }
      // scroll top button
      var pageOffset =
        document.documentElement.scrollTop || document.body.scrollTop;
      let btn = document.getElementById("scrollToTop");
      //
      if (btn) {
        if (pageOffset > 450) {
          btn.classList.add("show-top");
        } else {
          btn.classList.remove("show-top");
        }
      }
    };

    // loader
    document.body.onload = () => {
      let loader = document.querySelector(".loader-wrapper");
      if (loader) {
        loader.classList.add("d-none");
      }
    };
  }, []);

  async function connect() {
    window.ethereum ? await enableWeb3() : await Moralis.enableWeb3({ provider: "walletconnect" })
  }

  return (
    <header className="page-header" ref={headerRef}>
      <div className="web_container">
        <nav className="navbar navbar-expand-lg">
          <span
            className="navbar-brand cursor-pointer"
            onClick={() => scrollTo_Section("hero")}
          >
            {isMobile ? <button onClick={() => connect()} className="cs_btn mint_btn">{isWeb3Enabled ? `${account.slice(0, 8)}...` : "Connect Wallet"}</button> : <h2 className="headerLogo">Legendary Owls</h2>}

            {/* <img src={logo} alt="logo" className="headerLogo" /> */}
          </span>
          <button
            onClick={() => {
              setOpen(true);
            }}
            className={`navbar-toggler navbar-toggler-main ${open ? " open" : ""
              }`}
            type="button"
          >
            <span className={`stick ${open ? " open" : ""}`}></span>
          </button>
          <div
            className={`collapse navbar-collapse ${open ? " show" : ""}`}
            id="navbarSupportedContent"
          >
            <button
              onClick={() => {
                setOpen(false);
              }}
              className={`navbar-toggler navbar-toggler-main ${open ? " open" : ""
                }`}
              type="button"
            >
              <span className={`stick ${open ? " open" : ""}`}></span>
            </button>
            <ul className="navbar-nav ms-auto">
              <li
                className={activeMenu === "staking" ? "current-menu-item" : ""}
              >
                <a
                  onClick={() => {
                    setOpen(false);
                    scrollTo_Section("staking");
                  }}
                >
                  STAKING
                </a>
              </li>
              <li className={activeMenu === "story" ? "current-menu-item" : ""}>
                <a
                  onClick={() => {
                    setOpen(false);
                    scrollTo_Section("story");
                  }}
                >
                  OUR STORY
                </a>
              </li>
              <li
                className={activeMenu === "roadmap" ? "current-menu-item" : ""}
              >
                <a
                  onClick={() => {
                    setOpen(false);
                    scrollTo_Section("roadmap");
                  }}
                >
                  ROADMAP
                </a>
              </li>
              <li
                className={activeMenu === "artist" ? "current-menu-item" : ""}
              >
                <a
                  onClick={() => {
                    setOpen(false);
                    scrollTo_Section("artist");
                  }}
                >
                  TEAM
                </a>
              </li>
              <li className={activeMenu === "faq" ? "current-menu-item" : ""}>
                <a
                  onClick={() => {
                    setOpen(false);
                    scrollTo_Section("faq");
                  }}
                >
                  FAQS
                </a>
              </li>
            </ul>
            {/* mint button */}
            <button onClick={() => connect()} className="cs_btn mint_btn">{isWeb3Enabled ? `${account.slice(0, 8)}...` : "Connect Wallet"}</button>
            <div className="social-media header-social">
              <a href="https://opensea.io" target="_blank">
                <img src={openseaImg} className="img-fluid" alt="" />
              </a>
              {/* <a href="https://www.instagram.com/legendaryowls/" target="_blank">
                <img src={instaImg} className="img-fluid" alt="" />
              </a> */}
              <a href="https://twitter.com/LegendaryOwls" target="_blank">
                <img src={twitterImg} className="img-fluid" alt="" />
              </a>
            </div>
          </div>
          {/* mint button */}
          {/* <button className="cs_btn mint_btn">Connect Wallet</button> */}
          <button
            onClick={() => {
              setOpen(false);
            }}
            className={`navbar-toggler ${open ? " open" : ""}`}
            id="navoverlay"
            type="button"
          ></button>
        </nav>
      </div >
    </header >
  );
};

export default Header;
