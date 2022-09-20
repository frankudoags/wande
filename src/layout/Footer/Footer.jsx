import "./footer.css";

import openseaImg from "assets/images/others/opensea.png"
import instaImg from "assets/images/others/insta.png"
import twitterImg from "assets/images/others/twitter.png"
import footerLogo from "assets/images/others/logo.png"
import discordImg from "assets/images/others/discordImg.png"

const Footer = () => {
    return (
        <footer className="page-footer">
            <div className="container">
                <div className="page-footer-top">
                    <div className="footer-logo">
                        <img loading="lazy" decoding="async" src={footerLogo} className="img-fluid" alt="" />
                    </div>
                    <div className="partner-logo">
                        <a href="https://discord.gg/GDBaBfTdQw" target="_blank"><img loading="lazy" decoding="async" src={discordImg} className="img-fluid" alt="" /></a>
                    </div>
                    <div className="social-media">
                        <a href="https://opensea.io/collection/lo-legendaryowls" target="_blank"><img loading="lazy" decoding="async" src={openseaImg} className="img-fluid" alt="" /></a>
                        {/* <a href="https://www.instagram.com/legendaryowls/" target="_blank"><img loading="lazy" decoding="async" src={instaImg} className="img-fluid" alt="" /></a> */}
                        <a href="https://twitter.com/LegendaryOwls" target="_blank"><img loading="lazy" decoding="async" src={twitterImg} className="img-fluid" alt="" /></a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="container">
                    <p>©Copyright-{new Date().getFullYear()} LEGENDARY Owls. ALL RIGHTS RESERVED.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;