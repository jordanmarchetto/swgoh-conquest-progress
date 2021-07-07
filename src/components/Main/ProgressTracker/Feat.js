/**
 * Feat.js
 * container for a feat to be tracked
 */
import React, { Component } from 'react';
//https://material-ui.com/components/buttons/
import { Button, Checkbox, FormControlLabel } from '@material-ui/core';
import { Add, Remove } from '@material-ui/icons';
import Team from "./Team";

class Feat extends Component {


    handleMarkComplete = () => function () {
        console.log("mark complete clicked");
    }

    render() {
        const completed = true;
        const suggested_team_1 = ["JKR", "JMLS", "JKL", "GAS", "Wat"]; //example team
        const suggested_team_2 = ["CLS rebels"];

        //{ id: "4", mode: "hard", title: "Bombs Away", description: "Inflict at least 100 Thermal Detonators on enemies", count: "100", tags: [], sector: "3" },
        const {id, mode, title, description, count, tags, sector} = this.props.data;
        const progress = "0";
        const keycards = this.props.keycards;

        return (
            <div className="feat-wrapper">
                <h2>{title} - {mode}</h2>
                <p>{description}</p>
                <p>{count}</p>
                Worth <span>{keycards}</span> Keycards
                <br />
                <Button variant="contained" color="default" endIcon={<Add>add</Add>}> Add </Button>
                <Button variant="contained" color="default" endIcon={<Remove>remove</Remove>}> Remove </Button>

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={completed}
                            onChange={this.handleMarkComplete}
                            name="mark_complete"
                            color="default"
                        />
                    }
                    label="Mark Complete"
                />
                <br />
                <h3>Suggested Teams</h3>
                <Team suggested_team={suggested_team_1} />
                <Team suggested_team={suggested_team_2} />

            </div>
        )
    }
}
export default Feat;