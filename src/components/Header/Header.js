/**
 * Header.js
 * Sitewide header; includes the burger menu and navigation links
 */
import React from 'react';
import '../../css/Header.css';
import { slide as Menu } from 'react-burger-menu';

const Header = ({ menuOpen, title, handleMenuToggle }) => {

    //takes string input and saves it to browser local storage
    //theoretically we'd sanitize the input here
    const loadProgress = () => {
        let progress = window.prompt("Enter your progress string below:");
        localStorage.setItem("conquest_progress", progress);
        window.location.hash = "load-progress";
        window.location.reload();
    }

    //deletes the progress entry from browser local storage
    const resetProgress = () => {
        if (window.confirm("Are you sure you want to clear your progress?")) {
            console.log("conquest progress reset");
            localStorage.removeItem("conquest_progress");
            window.location.hash = "reset-progress";
            window.location.reload();
        }
    }

    //displays the progress string from local storage in a copy/paste friendly format
    const shareProgress = () => {
        const progress = localStorage.getItem("conquest_progress");
        window.prompt("Your progress:", progress)
    }

    return (
        <header>
            <Menu
                isOpen={menuOpen}
                onStateChange={(state) => handleMenuToggle(state)}
                activeClassName="active"
                className="menu-toggle"
            >
                <a id="home" href="/" className="menu-link">Home</a>
                <a id="reset_progress" href="#reset-progress" onClick={resetProgress} className="menu-link">Reset Progress</a>
                <a id="share_progress" href="#share-progress" onClick={shareProgress} className="menu-link">Share Progress</a>
                <a id="load_progress" href="#load-progress" onClick={loadProgress} className="menu-link">Load Progress</a>
            </Menu>
            <div className="header-wrapper">
                <h1 className="app-title">{title}</h1>
            </div>
            <div className="fake-shadow"> </div>
        </header>
    );
}

export default Header;