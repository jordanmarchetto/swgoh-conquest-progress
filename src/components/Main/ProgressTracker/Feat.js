/**
 * Feat.js
 * container for a feat to be tracked, also stores the progress of that particular feat
 */
import React, { Component } from 'react';
//https://material-ui.com/components/buttons/
import { Button, Checkbox, FormControlLabel } from '@material-ui/core';
import { Add, Remove } from '@material-ui/icons';
import Team from "./Team";

class Feat extends Component {

    constructor(props) {
        super(props);
        this.state = { id: false, count: "0", complete: "false" };
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
        this.props.onProgressUpdate({ id: this.state.id, count: this.state.count, keycards: this.props.keycards, complete: complete });
    }
    incrementCount = () => {
        let count = Number(this.state.count);
        count++;
        this.props.onProgressUpdate({ id: this.state.id, count: count, keycards: this.props.keycards });
    }
    decrementCount = () => {
        let count = Number(this.state.count);
        count--;
        this.props.onProgressUpdate({ id: this.state.id, count: count, keycards: this.props.keycards });
    }

    render() {
        const suggested_team_1 = ["JKR", "JMLS", "JKL", "GAS", "Wat"]; //example team
        const suggested_team_2 = ["CLS rebels"];

        //{ id: "44", type: "sector", mode: "hard", title: "Super Support", description: "Grant at least 100 buffs to allies", goal: "100", tags: [], sector: "2", active: "true"},
        const { id, mode, title, description, goal, tags, sector } = this.props.feat;
        const { keycards, progress } = this.props;
        const { count, complete } = this.state;

        return (
            <div className={complete === "true" ? "feat-wrapper feat-complete" : "feat-wrapper"}>
                <div className="hidden details">id: {id}, mode: {mode}, tags: {tags}, sector: {sector}, progress: {JSON.stringify(progress)}</div>
                <h2>{title}</h2>
                <p>{description}</p>
                <p>current count is: {count}, goal is: {goal}, complete is: {complete}</p>
                Worth <span>{keycards}</span> Keycards
                <br />
                <Button onClick={this.incrementCount} variant="contained" color="default" endIcon={<Add>add</Add>}></Button>
                <Button onClick={this.decrementCount} variant="contained" color="default" endIcon={<Remove>remove</Remove>}></Button>

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