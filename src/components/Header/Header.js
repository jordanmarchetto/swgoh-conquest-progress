/**
 * Header.js
 * Sitewide header; includes the burger menu and navigation links
 */
import React, { Component } from 'react';
import '../../css/Header.css';
import { slide as Menu } from 'react-burger-menu';

class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            menuOpen: false,
            title: "Conquest Progress"
        }
    }

    //takes string input and saves it to browser local storage
    //theoretically we'd sanitize the input here
    loadProgress(){
        let progress = window.prompt("Enter your progress string below:");
        localStorage.setItem("conquest_progress", progress);
        window.location.hash = "load-progress";
        window.location.reload();
    }

    //deletes the progress entry from browser local storage
    resetProgress(){
        if (window.confirm("Are you sure you want to clear your progress?")) {
            console.log("conquest progress reset");
            localStorage.removeItem("conquest_progress");
            window.location.hash = "reset-progress";
            window.location.reload();
        }
    }

    //displays the progress string from local storage in a copy/paste friendly format
    shareProgress(){
        const progress = localStorage.getItem("conquest_progress");
        window.prompt("Your progress:", progress)
    }

    handleStateChange(state) {
        this.setState({ menuOpen: state.isOpen })
    }

    closeMenu() {
        this.setState({ menuOpen: false })
    }

    toggleMenu() {
        this.setState({ menuOpen: !this.state.menuOpen })
    }

    render() {
        return (
            <header>
                <Menu
                    isOpen={this.state.menuOpen}
                    onStateChange={(state) => this.handleStateChange(state)}
                    activeClassName="active"
                    className="menu-toggle"
                >
                    <a id="home" href="/" className="menu-link">Home</a>
                    <a id="reset_progress" href="#reset-progress" onClick={this.resetProgress} className="menu-link">Reset Progress</a>
                    <a id="share_progress" href="#share-progress" onClick={this.shareProgress} className="menu-link">Share Progress</a>
                    <a id="load_progress" href="#load-progress" onClick={this.loadProgress} className="menu-link">Load Progress</a>
                </Menu>
                <div className="header-wrapper">
                    <h1 className="app-title">{this.state.title}</h1>
                </div>
                <div className="fake-shadow"> </div>
            </header>
        )
    }
 

}
export default Header;