/**
 * Feat.js
 * container for a feat to be tracked, also stores the progress of that particular feat
 */
import React, { Component } from 'react';
import img_keycard from '../../../images/keycard.png';
//https://material-ui.com/components/buttons/
import { Checkbox, FormControlLabel, IconButton, TextField } from '@material-ui/core';
import { Add, Remove, Check } from '@material-ui/icons';
import Team from "./Team";

class Feat extends Component {

    constructor(props) {
        super(props);
        this.state = { id: false, count: "0", complete: "false", editMode: false };
    }

    //get the data from props and store it in the state
    static getDerivedStateFromProps(props, state) {
        const progress = props.progress;
        let id = props.feat.id;
        let count = (progress !== undefined && progress.count !== undefined) ? progress.count : "0";
        let complete = (progress !== undefined && progress.complete !== undefined) ? progress.complete : "false";
        return { id: id, count: count, complete: complete };
    }

    handleMarkComplete = () => {
        let complete = this.state.complete;
        complete = (complete === "true") ? "false" : "true";
        this.props.onProgressUpdate({ id: this.state.id, count: this.state.count, keycards: this.props.keycards, complete: complete, sector: this.props.feat.sector });
    }
    updateCount = (e) => {
        let val = Number(e.target.value);
        this.props.onProgressUpdate({ id: this.state.id, count: val, keycards: this.props.keycards, sector: this.props.feat.sector  });
    }
    incrementCount = () => {
        let count = Number(this.state.count);
        count++;
        this.props.onProgressUpdate({ id: this.state.id, count: count, keycards: this.props.keycards, sector: this.props.feat.sector  });
    }
    decrementCount = () => {
        let count = Number(this.state.count);
        count--;
        this.props.onProgressUpdate({ id: this.state.id, count: count, keycards: this.props.keycards, sector: this.props.feat.sector  });
    }

    render() {
        const suggested_team_1 = ["JKR", "JMLS", "JKL", "GAS", "Wat"]; //example team
        const suggested_team_2 = ["CLS rebels"];

        //{ id: "44", type: "sector", mode: "hard", title: "Super Support", description: "Grant at least 100 buffs to allies", goal: "100", tags: [], sector: "2", active: "true"},
        const { id, mode, title, description, goal, tags, sector } = this.props.feat;
        const { keycards, progress } = this.props;
        const { count, complete, editMode } = this.state;

        return (
            <div className={complete === "true" ? "feat-wrapper feat-complete" : "feat-wrapper"}>
                <div className="hidden details">id: {id}, mode: {mode}, tags: {tags}, sector: {sector}, progress: {JSON.stringify(progress)}</div>
                <div className="title-wrapper">
                    <h2>{title}
                        {complete === "true" ? <div className="feat-complete-check"><Check fontSize="large" /></div> : ""}
                    </h2>
                    <div className="keycard-display"><h3>{keycards}</h3> <img src={img_keycard} alt="keycard icon" /></div>
                </div>
                <p>{description}</p>
                <div className="feat-progress-controls">
                    <div className="feat-count-wrapper">
                        {editMode === false ?
                            <div className="feat-count" onClick={() => { this.setState({ editMode: !editMode }) }}><strong>{count}</strong></div>
                            :
                            <TextField
                                id={"feat_progress_" + id}
                                type="number"
                                name="feat_progress"
                                className="feat-number-input"
                                value={"" + Number(count)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                                onBlur={() => { this.setState({ editMode: !editMode }) }}
                                onChange={this.updateCount}
                            />
                        }

                        <span className="big-slash">/</span> <div className="feat-goal">{goal}</div>
                    </div>
                    <div className="controls">
                        <IconButton aria-label="add" onClick={this.incrementCount} color="default"><Add /></IconButton>
                        <IconButton aria-label="remove" onClick={this.decrementCount} color="default"><Remove /></IconButton>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={complete === "true" ? true : false}
                                    onChange={this.handleMarkComplete}
                                    name="mark_complete"
                                    color="default"
                                />
                            }
                            label="Mark Complete"
                        />
                    </div>
                </div>
                <div className="hidden">
                    <br />
                    <h3>Suggested Teams</h3>
                    <Team suggested_team={suggested_team_1} />
                    <Team suggested_team={suggested_team_2} />
                </div>

            </div>
        )
    }
}
export default Feat;