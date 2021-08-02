/**
 * Footer.js
 * Sitewide footer, shows contact info and build
 */
import React from 'react';
import '../../css/Footer.css';
import { SubdirectoryArrowRight } from '@material-ui/icons';

const Footer = () => {

    //just toggles off all the .hidden components (debug stuff)
    const showHidden = () => {
        console.log("showing hidden elements");
        let hidden_stuff = document.querySelectorAll(".hidden");
        for (let i = 0; i < hidden_stuff.length; i++) {
            let ele = hidden_stuff[i];
            ele.classList.remove("hidden");
        }
    }

    return (
        <footer>
            <div className="footer-wrapper">
                <a href="https://api.jmar.dev"><span className="footer-icon"><SubdirectoryArrowRight fontSize="small" /></span>Jordan Marchetto</a> 
                &nbsp;&middot;&nbsp;Need Help? <a href = "mailto:swgoh.conquest.support@jmar.dev"> &#115;&#119;&#103;&#111;&#104;&#46;&#99;&#111;&#110;&#113;&#117;&#101;&#115;&#116;&#46;&#115;&#117;&#112;&#112;&#111;&#114;&#116;<span className="at-sign"></span>&#106;&#109;&#97;&#114;&#46;&#100;&#101;&#118;</a>
                {process.env.REACT_APP_REGION === "development" ? <span><br /><a href="#show-hidden" onClick={showHidden} className="show-hidden-button">dev: show hidden content</a></span> : ""}
            </div>
            <span className="hidden">{process.env.REACT_APP_REGION + " build"}</span>
        </footer>

    );
}

export default Footer;