/**
 * Header.js
 * Sitewide header; includes the burger menu and navigation links
 */
import React from 'react';
import '../../css/Header.css';
import { slide as Menu } from 'react-burger-menu';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';


const Header = ({ menuOpen, title, handleMenuToggle }) => {
    const [resetDialogOpen, setResetDialogOpen] = React.useState(false);
    const [shareDialogOpen, setShareDialogOpen] = React.useState(false);
    const [loadDialogOpen, setLoadDialogOpen] = React.useState(false);

    //on dialog close, deletes the progress entry from browser local storage
    const handleCloseReset = (res) => {
        //res will contain the user's choice, true = ok, false = cancel
        if (res === true) {
            console.log("conquest progress reset");
            localStorage.removeItem("conquest_progress");
            window.location.hash = "reset-progress";
            window.location.reload();
        }
        setResetDialogOpen(false);
    }
    //open reset dialog
    const handleOpenReset = () => { setResetDialogOpen(true); }

    //share dialog doesn't do anything other than display info
    const handleCloseShare = () => { setShareDialogOpen(false); }
    const handleOpenShare = () => { setShareDialogOpen(true); }

    //on dialog close, takes string input and saves it to browser local storage
    const handleCloseLoad = (res) => {
        //res will contain the user's choice, true = ok, false = cancel
        if (res === true) {
            console.log("loading progress");
            let progress_str = document.getElementById("load_progress_string").value;
            localStorage.setItem("conquest_progress", progress_str);
            window.location.hash = "load-progress";
            window.location.reload();
        }
        setLoadDialogOpen(false);
    }
    //open load dialog
    const handleOpenLoad = () => { setLoadDialogOpen(true); }

    //pulls the progress string from local storage
    const getCurrentProgress = () => {
        return localStorage.getItem("conquest_progress");
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
                <a id="reset_progress" href="#reset-progress" onClick={handleOpenReset} className="menu-link">Reset Progress</a>
                <a id="share_progress" href="#share-progress" onClick={handleOpenShare} className="menu-link">Share Progress</a>
                <a id="load_progress" href="#load-progress" onClick={handleOpenLoad} className="menu-link">Load Progress</a>

                <Dialog open={resetDialogOpen} onClose={handleCloseReset} aria-labelledby="form-dialog-title-reset">
                    <DialogTitle id="form-dialog-title-reset">Reset Progress</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you want to clear your progress?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => handleCloseReset(false)} color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={() => handleCloseReset(true)} color="primary">
                            Ok
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog open={shareDialogOpen} onClose={handleCloseShare} aria-labelledby="form-dialog-title-share">
                    <DialogTitle id="form-dialog-title-share">Share Progress</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Copy your progress string below:
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="share_progress_string"
                            label="Conquest Progress"
                            type="text"
                            value={getCurrentProgress()}
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseShare} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog open={loadDialogOpen} onClose={handleCloseLoad} aria-labelledby="form-dialog-title-load">
                    <DialogTitle id="form-dialog-title-load">Load Progress</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Paste a progress string below:
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="load_progress_string"
                            label="Conquest Progress"
                            type="text"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => handleCloseLoad(false)} color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={() => handleCloseLoad(true)} color="primary">
                            Ok
                        </Button>
                    </DialogActions>
                </Dialog>
            </Menu>
            <div className="header-wrapper">
                <h1 className="app-title">{title}</h1>
            </div>
            <div className="fake-shadow"> </div>
        </header>
    );
}

export default Header;