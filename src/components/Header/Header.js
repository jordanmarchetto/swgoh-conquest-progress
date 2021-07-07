/**
 * Header.js
 * Sitewide header; includes the burger menu and navigation links
 */
import React, { Component } from 'react';
import '../../css/Header.css';
import { slide as Menu } from 'react-burger-menu';

class Header extends Component {
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
                    <a id="reset" href="/" className="menu-link">Reset Progress</a>
                    <a id="share_progress" href="/" className="menu-link">Share Progress</a>
                    <a id="load_progress" href="/" className="menu-link">Load Progress</a>
                </Menu>
                <div className="header-wrapper">
                    <h1 className="app-title">{this.state.title}</h1>
                </div>
                <div className="fake-shadow"> </div>
            </header>
        )
    }
    constructor(props) {
        super(props)
        this.state = {
            menuOpen: false,
            title: "Conquest Progress"
        }
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


}
export default Header;