/**
 * ProgressTracker.js
 * main component for the app; houses all the stuff needed for the conquest progress tracker
 */

import React, { Component } from 'react';
import ChestProgress from './ChestProgress';
import SectorPanel from './SectorPanel';
import '../../../css/ProgressTracker.css';

class ProgressTracker extends Component {

    constructor(props) {
        super(props);

        //Data structure for suggested teams
        const DATA_TEAMS = [
            {
                id: "0",
                name: "jedis",
                team: ["JKR", "JMLS", "JKL", "GAS", "Wat"],
                tags: ["jedi"],
                notes: ""
            },
            {
                id: "1",
                name: "cls_rebs",
                team: ["CLS rebels"],
                tags: ["rebel", "crits", "no_tank", "ls"],
                notes: ""
            }
        ];

        //Data structure for conquest, all feats, etc
        const DATA_CONQUEST_TEMPLATE = {
            end_date: "7/17/2021",
            global_feats: [
                {id: "0", description: "Win battles with LS squads", count: "50", tags: "ls"},
                {id: "1", description: "Win battles with DS squads", count: "50", tags: "ds"},
            ],
            sector_1_feats: [
                {id: "5", description: "Win battles without losing a character", count: "20"},
                {id: "6", description: "Get critical hits", count: "100", tags:"crits"},
                {id: "7", description: "Gain avoidance", count: "50"},
            ],
            chests: [
                {id: "0", description: "Gold", keycards_needed: "420"}
            ]

        }

        //Data structure for user's progress
        const DATA_CONQUEST_PROGRESS = {
            keycards: "200"
        }

        this.state = { teams: DATA_TEAMS, conquest_template: DATA_CONQUEST_TEMPLATE, progress: DATA_CONQUEST_PROGRESS};
    }

    componentDidMount() {
    }

    render() {
        let keycards = this.state.progress.keycards;
        let keycards_needed = this.state.conquest_template.chests[0].keycards_needed;
        let days_left = 12;
        let end_date = this.state.conquest_template.end_date;

        return (
            <div className="progress-tracker">
                <ChestProgress keycards={keycards} keycards_needed={keycards_needed} days_left={days_left} end_date ={end_date} />
                <SectorPanel title="Global Feats" startOpen={true} />
                <SectorPanel title="Sector 1"/>
                <SectorPanel title="Sector 2"/>
                <SectorPanel title="Sector 3"/>
                <SectorPanel title="Sector 4"/>
                <SectorPanel title="Sector 5"/>
                <p>notes</p>
            </div>
        )
    }
}
export default ProgressTracker;