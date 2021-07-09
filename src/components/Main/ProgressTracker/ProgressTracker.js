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
        //https://wiki.swgoh.help/wiki/Conquest
        const DATA_CONQUEST_TEMPLATE = {
            end_date: "7/19/2021",
            all_feats: [
                //event feats:
                { id: "0", type: "event", mode: "hard", title: "Brute Force", description: "Deal at least 2,000,000 Physical damage", goal: "1", tags: [], sector: "None", active: "false" },
                { id: "1", type: "event", mode: "normal", title: "Brute Force", description: "Deal at least 1,000,000 Physical damage", goal: "1", tags: [], sector: "None", active: "false" },
                { id: "2", type: "event", mode: "hard", title: "Dabble in Darkness", description: "Win at least 50 battles with a squad of all dark side units", goal: "50", tags: [], sector: "None", active: "true" },
                { id: "3", type: "event", mode: "normal", title: "Dabble in Darkness", description: "Win at least 35 battles with a squad of all dark side units", goal: "35", tags: [], sector: "None", active: "true" },
                { id: "4", type: "event", mode: "hard", title: "Grand Victory", description: "Defeat at least 500 enemies", goal: "500", tags: [], sector: "None", active: "true" },
                { id: "5", type: "event", mode: "normal", title: "Grand Victory", description: "Defeat at least 400 enemies", goal: "400", tags: [], sector: "None", active: "true" },
                { id: "6", type: "event", mode: "hard", title: "Live in Light", description: "Win at least 50 battles with a squad of all light side units", goal: "50", tags: [], sector: "None", active: "true" },
                { id: "7", type: "event", mode: "normal", title: "Live in Light", description: "Win at least 35 battles with a squad of all light side units", goal: "35", tags: [], sector: "None", active: "true" },
                { id: "8", type: "event", mode: "hard", title: "Lucky Shot", description: "Score at least 1500 Critical Hits", goal: "1500", tags: [], sector: "None", active: "true" },
                { id: "9", type: "event", mode: "normal", title: "Lucky Shot", description: "Score at least 750 Critical Hits", goal: "750", tags: [], sector: "None", active: "true" },
                { id: "10", type: "event", mode: "hard", title: "Mental Challenge", description: "Deal at least 2,000,000 Special damage", goal: "1", tags: [], sector: "None", active: "false" },
                { id: "11", type: "event", mode: "normal", title: "Mental Challenge", description: "Deal at least 1,000,000 Special damage", goal: "1", tags: [], sector: "None", active: "false" },
                { id: "12", type: "event", mode: "hard", title: "Recovery Expert", description: "Recover at least 1,500,000 points of Health", goal: "1", tags: [], sector: "None", active: "false" },
                { id: "13", type: "event", mode: "normal", title: "Recovery Expert", description: "Recover at least 1,000,000 points of Health", goal: "1", tags: [], sector: "None", active: "false" },
                { id: "14", type: "event", mode: "hard", title: "Simple Tricks", description: "Use special abilities 700 times", goal: "700", tags: [], sector: "None", active: "false" },
                { id: "15", type: "event", mode: "normal", title: "Simple Tricks", description: "Use special abilities at least 500 times", goal: "500", tags: [], sector: "None", active: "false" },
                { id: "16", type: "event", mode: "hard", title: "Unguarded", description: "Win 20 battles with no tanks in your squad", goal: "20", tags: [], sector: "None", active: "true" },
                { id: "17", type: "event", mode: "normal", title: "Unguarded", description: "Win 10 battles with no Tanks in your squad", goal: "10", tags: [], sector: "None", active: "true" },
                //sector feats:
                { id: "18", type: "sector", mode: "hard", title: "All Jedi", description: "Win at least 14 battles with a full Squad of Jedi units", goal: "14", tags: [], sector: "2", active: "true" },
                { id: "19", type: "sector", mode: "normal", title: "All Jedi", description: "Win at least 7 battles with a full Squad of Jedi units", goal: "7", tags: [], sector: "2", active: "true" },
                { id: "20", type: "sector", mode: "hard", title: "All Sith", description: "Win at least 14 battles with a full Squad of Sith units", goal: "14", tags: [], sector: "3", active: "true" },
                { id: "21", type: "sector", mode: "normal", title: "All Sith", description: "Win at least 7 battles with a full Squad of Sith units", goal: "7", tags: [], sector: "3", active: "true" },
                { id: "22", type: "sector", mode: "hard", title: "Bombs Away", description: "Inflict at least 100 Thermal Detonators on enemies", goal: "100", tags: [], sector: "3", active: "true" },
                { id: "23", type: "sector", mode: "normal", title: "Bombs Away", description: "Inflict at least 50 Thermal Detonators on enemies", goal: "50", tags: [], sector: "3", active: "true" },
                { id: "24", type: "sector", mode: "hard", title: "Critical Success", description: "Gain Advantage 40 times", goal: "40", tags: [], sector: "1", active: "true" },
                { id: "25", type: "sector", mode: "normal", title: "Critical Success", description: "Gain Advantage 20 times", goal: "20", tags: [], sector: "1", active: "true" },
                { id: "26", type: "sector", mode: "hard", title: "Disarmed", description: "Win 10 battles with no Attackers in your squad", goal: "10", tags: [], sector: "4", active: "true" },
                { id: "27", type: "sector", mode: "normal", title: "Disarmed", description: "Win 5 battles with no Attackers in your squad", goal: "5", tags: [], sector: "4", active: "true" },
                { id: "28", type: "sector", mode: "hard", title: "Flawless Victory", description: "Win at least 20 battles without losing any units", goal: "20", tags: [], sector: "1", active: "true" },
                { id: "29", type: "sector", mode: "normal", title: "Flawless Victory", description: "Win at least 10 battles without losing any units", goal: "10", tags: [], sector: "1", active: "true" },
                { id: "30", type: "sector", mode: "hard", title: "Fleet-Footed", description: "Evade at least 100 attacks", goal: "100", tags: [], sector: "5", active: "true" },
                { id: "31", type: "sector", mode: "normal", title: "Fleet-Footed", description: "Evade at least 50 attacks", goal: "50", tags: [], sector: "5", active: "true" },
                { id: "32", type: "sector", mode: "hard", title: "Grand Victory", description: "Defeat at least 200 enemies", goal: "200", tags: [], sector: "5", active: "true" },
                { id: "33", type: "sector", mode: "normal", title: "Grand Victory", description: "Defeat at least 100 enemies", goal: "100", tags: [], sector: "5", active: "true" },
                { id: "34", type: "sector", mode: "hard", title: "Lucky Shot", description: "Score at least 200 Critical Hits", goal: "200", tags: [], sector: "1", active: "true" },
                { id: "35", type: "sector", mode: "normal", title: "Lucky Shot", description: "Score at least 100 Critical Hits", goal: "100", tags: [], sector: "1", active: "true" },
                { id: "36", type: "sector", mode: "hard", title: "Lucky Shot", description: "Score at least 200 Critical Hits", goal: "200", tags: [], sector: "4", active: "true" },
                { id: "37", type: "sector", mode: "normal", title: "Lucky Shot", description: "Score at least 100 Critical Hits", goal: "100", tags: [], sector: "4", active: "true" },
                { id: "38", type: "sector", mode: "hard", title: "One by One", description: "Inflict Marked on at least 40 enemies", goal: "40", tags: [], sector: "4", active: "true" },
                { id: "39", type: "sector", mode: "normal", title: "One by One", description: "Inflict Marked on at least 20 enemies", goal: "20", tags: [], sector: "4", active: "true" },
                { id: "40", type: "sector", mode: "hard", title: "Opportunistic Advance", description: "Attack out of turn 100 times", goal: "100", tags: [], sector: "2", active: "true" },
                { id: "41", type: "sector", mode: "normal", title: "Opportunistic Advance", description: "Attack out of turn 50 times", goal: "50", tags: [], sector: "2", active: "true" },
                { id: "42", type: "sector", mode: "hard", title: "Simple Tricks", description: "Use special abilities at least 150 times", goal: "150", tags: [], sector: "None", active: "false" },
                { id: "43", type: "sector", mode: "normal", title: "Simple Tricks", description: "Use special abilities at least 100 times", goal: "100", tags: [], sector: "None", active: "false" },
                { id: "44", type: "sector", mode: "hard", title: "Super Support", description: "Grant at least 100 buffs to allies", goal: "100", tags: [], sector: "2", active: "true" },
                { id: "45", type: "sector", mode: "normal", title: "Super Support", description: "Grant at least 50 buffs to allies", goal: "50", tags: [], sector: "2", active: "true" },
                { id: "46", type: "sector", mode: "hard", title: "The Slow Game", description: "Inflict at least 300 Damage Over Time effects on enemies", goal: "300", tags: [], sector: "5", active: "true" },
                { id: "47", type: "sector", mode: "normal", title: "The Slow Game", description: "Inflict at least 200 Damage Over Time effects on enemies", goal: "200", tags: [], sector: "5", active: "true" },
                { id: "48", type: "sector", mode: "hard", title: "Wreak Havoc", description: "Inflict at least 100 debuffs on enemies", goal: "100", tags: [], sector: "3", active: "true" },
                { id: "49", type: "sector", mode: "normal", title: "Wreak Havoc", description: "Inflict at least 50 debuffs on enemies", goal: "50", tags: [], sector: "3", active: "true" },
                //boss feats:
                { id: "50", type: "boss", mode: "hard", title: "Chain Attack", description: "Complete the battle after taking 15 or more consecutive turns before the enemy takes a turn", goal: "1", tags: [], sector: "1", active: "true" },
                { id: "51", type: "boss", mode: "normal", title: "Chain Attack", description: "Complete the battle after taking 10 or more consecutive turns before the enemy takes a turn", goal: "1", tags: [], sector: "1", active: "true" },
                { id: "52", type: "boss", mode: "hard", title: "Devastating Strike", description: "Deal at least 200,000 damage to an enemy in a single hit", goal: "1", tags: [], sector: "1", active: "true" },
                { id: "53", type: "boss", mode: "normal", title: "Devastating Strike", description: "Deal at least 100,000 damage to an enemy in a single hit", goal: "1", tags: [], sector: "1", active: "true" },
                { id: "54", type: "boss", mode: "hard", title: "Crush Them", description: "Defeat at least 4 enemies in the same turn", goal: "1", tags: [], sector: "1", active: "true" },
                { id: "55", type: "boss", mode: "normal", title: "Crush Them", description: "Defeat at least 3 enemies in the same turn", goal: "1", tags: [], sector: "1", active: "true" },
                { id: "56", type: "boss", mode: "hard", title: "Simple Trick", description: "Win without using more than 6 special abilities", goal: "1", tags: [], sector: "2", active: "true" },
                { id: "57", type: "boss", mode: "normal", title: "Simple Trick", description: "Win without using more than 10 special abilities", goal: "1", tags: [], sector: "2", active: "true" },
                { id: "58", type: "boss", mode: "hard", title: "Unguarded", description: "Win the battle with no Tanks in your squad", goal: "1", tags: [], sector: "2", active: "true" },
                { id: "59", type: "boss", mode: "normal", title: "Unguarded", description: "Win the battle with no Tanks in your squad", goal: "1", tags: [], sector: "2", active: "true" },
                { id: "60", type: "boss", mode: "hard", title: "Hindered Movement", description: "Remove from enemies at least 700% Turn Meter (total)", goal: "1", tags: [], sector: "2", active: "true" },
                { id: "61", type: "boss", mode: "normal", title: "Hindered Movement", description: "Remove from enemies at least 500% Turn Meter (total)", goal: "1", tags: [], sector: "2", active: "true" },
                { id: "62", type: "boss", mode: "hard", title: "Flawless Victory", description: "Win without losing any units ", goal: "1", tags: [], sector: "3", active: "true" },
                { id: "63", type: "boss", mode: "normal", title: "Flawless Victory", description: "Win without losing any units ", goal: "1", tags: [], sector: "3", active: "true" },
                { id: "64", type: "boss", mode: "hard", title: "Lucky Shot", description: "Score at least 40 Critical Hits", goal: "1", tags: [], sector: "3", active: "true" },
                { id: "65", type: "boss", mode: "normal", title: "Lucky Shot", description: "Score at least 30 Critical Hits", goal: "1", tags: [], sector: "3", active: "true" },
                { id: "66", type: "boss", mode: "hard", title: "No Old Republic", description: "Win without using any Old Republic characters in your squad ", goal: "1", tags: [], sector: "3", active: "true" },
                { id: "67", type: "boss", mode: "normal", title: "No Old Republic", description: "Win without using any Old Republic characters in your squad ", goal: "1", tags: [], sector: "3", active: "true" },
                { id: "68", type: "boss", mode: "hard", title: "Hindered Movement", description: "Remove from enemies at least 700% Turn Meter (total)", goal: "1", tags: [], sector: "4", active: "true" },
                { id: "69", type: "boss", mode: "normal", title: "Hindered Movement", description: "Remove from enemies at least 500% Turn Meter (total)", goal: "1", tags: [], sector: "4", active: "true" },
                { id: "70", type: "boss", mode: "hard", title: "Opportunistic Advance", description: "Attack out of turn at least 30 times", goal: "1", tags: [], sector: "4", active: "true" },
                { id: "71", type: "boss", mode: "normal", title: "Opportunistic Advance", description: "Attack out of turn at least 20 times", goal: "1", tags: [], sector: "4", active: "true" },
                { id: "72", type: "boss", mode: "hard", title: "Unsupportive", description: "Win without using any Support units in your squad", goal: "1", tags: [], sector: "4", active: "true" },
                { id: "73", type: "boss", mode: "normal", title: "Unsupportive", description: "Win without using any Support units in your squad", goal: "1", tags: [], sector: "4", active: "true" },
                { id: "74", type: "boss", mode: "hard", title: "Going Critical", description: "Score at least 20 critical hits in a row during ally turns", goal: "1", tags: [], sector: "5", active: "true" },
                { id: "75", type: "boss", mode: "normal", title: "Going Critical", description: "Score at least 10 critical hits in a row during ally turns", goal: "1", tags: [], sector: "5", active: "true" },
                { id: "76", type: "boss", mode: "hard", title: "Guarded Assault", description: "Win without losing any Attackers ", goal: "1", tags: [], sector: "5", active: "true" },
                { id: "77", type: "boss", mode: "normal", title: "Guarded Assault", description: "Win without losing any Attackers ", goal: "1", tags: [], sector: "5", active: "true" },
                { id: "78", type: "boss", mode: "hard", title: "Recovery Expert", description: "Recover at least 500,000 points of Health", goal: "1", tags: [], sector: "5", active: "true" },
                { id: "79", type: "boss", mode: "normal", title: "Recovery Expert", description: "Recover at least 300,000 points of Health", goal: "1", tags: [], sector: "5", active: "true" },
            ],
            chests: [
                { id: "0", description: "Hard-01", keycards_needed: "65", rewards: [{ item_name: "Commander Ahsoka Tano", quantity: 25 }, { item_name: "Razor Crest", quantity: 20 },] },
                { id: "1", description: "Hard-02", keycards_needed: "120", rewards: [{ item_name: "Commander Ahsoka Tano", quantity: 30 }, { item_name: "Razor Crest", quantity: 24 },] },
                { id: "2", description: "Hard-03", keycards_needed: "155", rewards: [{ item_name: "Commander Ahsoka Tano", quantity: 35 }, { item_name: "Razor Crest", quantity: 28 },] },
                { id: "3", description: "Hard-04", keycards_needed: "255", rewards: [{ item_name: "Commander Ahsoka Tano", quantity: 40 }, { item_name: "Razor Crest", quantity: 32 },] },
                { id: "4", description: "Hard-05", keycards_needed: "290", rewards: [{ item_name: "Commander Ahsoka Tano", quantity: 50 }, { item_name: "Razor Crest", quantity: 36 },] },
                { id: "5", description: "Hard-06", keycards_needed: "360", rewards: [{ item_name: "Commander Ahsoka Tano", quantity: 65 }, { item_name: "Razor Crest", quantity: 40 },] },
                { id: "6", description: "Hard-07", keycards_needed: "425", rewards: [{ item_name: "Commander Ahsoka Tano", quantity: 90 }, { item_name: "Razor Crest", quantity: 44 },] },
            ]
        };

        //Data structure for user's progress
        const DATA_CONQUEST_PROGRESS = {
            keycards: 200,
            mode: "hard",
            feats: [{ id: "4", count: "21", complete: "false" }, { id: "6", count: "22", complete: "false" }, { id: "2", count: "43", complete: "false" }, { id: "24", count: "15", complete: "false" }, { id: "34", count: "69", complete: "false" }, { id: "44", count: "77", complete: "false" }],
            //battle progress
        }

        this.state = { teams: DATA_TEAMS, conquest_template: DATA_CONQUEST_TEMPLATE, progress: DATA_CONQUEST_PROGRESS };
    }

    componentDidMount() {
        let all_feats = this.state.conquest_template.all_feats;
        let mode = this.state.progress.mode;

        //filter out all the related feats based on mode and sector
        let sector_1_feats = all_feats.filter(feat => feat.type === "sector" && feat.sector === "1" && feat.mode === mode);
        let sector_2_feats = all_feats.filter(feat => feat.type === "sector" && feat.sector === "2" && feat.mode === mode);
        let sector_3_feats = all_feats.filter(feat => feat.type === "sector" && feat.sector === "3" && feat.mode === mode);
        let sector_4_feats = all_feats.filter(feat => feat.type === "sector" && feat.sector === "4" && feat.mode === mode);
        let sector_5_feats = all_feats.filter(feat => feat.type === "sector" && feat.sector === "5" && feat.mode === mode);

        let active_event_feats = all_feats.filter(feat => feat.type === "event" && feat.active === "true" && feat.mode === mode);

        //store the active feats in the state
        this.setState({ event_feats: active_event_feats, s1_feats: sector_1_feats, s2_feats: sector_2_feats, s3_feats: sector_3_feats, s4_feats: sector_4_feats, s5_feats: sector_5_feats });
    }

    //returns a feat obj
    getFeatInfo(id) {
        const feats = this.state.conquest_template.all_feats;
        let feat = feats.filter(f => f.id === id);
        return feat ? feat[0] : {};
    }

    //returns the progress of a specific feat
    getFeatProgress(id) {
        const progress = this.state.progress;
        if (progress !== undefined) {
            const progress_item = progress.feats.filter(feat => feat.id === id);
            return progress_item[0] ? progress_item[0] : {};
        }
    }

    //determines how many keycards have been earned
    calculateKeycards() {
        let progress = this.state.progress;
        let count = 0;
        //loop through progress array, if feat has keycards associated and is complete, add it to the total
        progress.feats.forEach(feat => count += (feat.keycards && feat.complete === "true") ? Number(feat.keycards) : 0);

        progress.keycards = count;
        this.setState({ progress: progress });
    }

    //update the state/progress for the given id/val obj
    // progress_update contains: {id: "0", count: "1", keycards: "5", complete: "true/false"}
    updateProgress = (progress_update) => {
        let id = progress_update.id ? progress_update.id : false;
        let count = progress_update.count ? progress_update.count : "0";
        let keycards = progress_update.keycards ? progress_update.keycards : "0";
        let complete = progress_update.complete ? progress_update.complete : "false";
        let progress = this.state.progress;
        //console.log("progress update received: " + JSON.stringify(progress_update));

        let found_entry = false; //make sure we found an entry
        //loop through all of the existing entries in the feat array, and if we find a match, update it
        for (const [i, feat] of progress.feats.entries()) {
            if (feat.id === id) {
                found_entry = true;
                const feat_info = this.getFeatInfo(id);
                const goal = feat_info.goal;
                //console.log("this feat:" + JSON.stringify(feat_info));

                //figure out what to do with complete
                let new_complete = complete;
                //if the count changed, check the values and update "complete"
                if (progress.feats[i].count !== count) {
                    new_complete = (count >= goal) ? "true" : "false";
                }
                //otherwise the count didn't change, but we got a new value for "complete", update complete
                //which we already did via: let new_complete = complete;

                //update the progress object
                count = (count >= goal) ? goal : count; //restrict count to the max value
                count = (count >= 0) ? count : 0; //restrict count to positive
                progress.feats[i].count = count;
                progress.feats[i].keycards = keycards;
                progress.feats[i].complete = new_complete;
            }
        }
        //if we didn't find a matching feat, push a new one to the list
        if (!found_entry) {
            progress.feats.push({ id: id, count: count, complete: complete, keycards: keycards });
        }
        this.setState({ progress: progress });
        this.calculateKeycards();
    }

    render() {
        let keycards = this.state.progress.keycards;
        let keycards_needed = this.state.conquest_template.chests[0].keycards_needed;
        let days_left = 12;
        let end_date = this.state.conquest_template.end_date;

        const { event_feats, s1_feats, s2_feats, s3_feats, s4_feats, s5_feats, progress } = this.state;

        return (
            <div className="progress-tracker">
                progress: {JSON.stringify(progress)}
                <br />
                <ChestProgress keycards={keycards} keycards_needed={keycards_needed} days_left={days_left} end_date={end_date} />
                <SectorPanel title="Event Feats" startOpen={true} type="event" feats={event_feats} keycards_each="9" progress={progress} onProgressUpdate={this.updateProgress} />
                <SectorPanel title="Sector 1" type="sector" feats={s1_feats} keycards_each="5" progress={progress} onProgressUpdate={this.updateProgress} />
                <SectorPanel title="Sector 2" type="sector" feats={s2_feats} keycards_each="5" progress={progress} onProgressUpdate={this.updateProgress} />
                <SectorPanel title="Sector 3" type="sector" feats={s3_feats} keycards_each="10" progress={progress} onProgressUpdate={this.updateProgress} />
                <SectorPanel title="Sector 4" type="sector" feats={s4_feats} keycards_each="10" progress={progress} onProgressUpdate={this.updateProgress} />
                <SectorPanel title="Sector 5" type="sector" feats={s5_feats} keycards_each="15" progress={progress} onProgressUpdate={this.updateProgress} />
                <p>notes</p>
            </div>
        )
    }
}
export default ProgressTracker;