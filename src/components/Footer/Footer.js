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
                {process.env.REACT_APP_REGION === "development" ? <a href="#show-hidden" onClick={showHidden} className="show-hidden-button">dev: show hidden content</a> : ""}
            </div>
            <span className="hidden">{process.env.REACT_APP_REGION + " build"}</span>
        </footer>

    );
}

export default Footer;