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
            event_feats: [
                { id: "0", mode: "hard", title: "Brute Force", description: "Deal at least 2,000,000 Physical damage", count: "1", tags: [], active: "false" },
                { id: "1", mode: "normal", title: "Brute Force", description: "Deal at least 1,000,000 Physical damage", count: "1", tags: [], active: "false" },
                { id: "2", mode: "hard", title: "Dabble in Darkness", description: "Win at least 50 battles with a squad of all dark side units", count: "50", tags: [], active: "true" },
                { id: "3", mode: "normal", title: "Dabble in Darkness", description: "Win at least 35 battles with a squad of all dark side units", count: "35", tags: [], active: "true" },
                { id: "4", mode: "hard", title: "Grand Victory", description: "Defeat at least 500 enemies", count: "500", tags: [], active: "true" },
                { id: "5", mode: "normal", title: "Grand Victory", description: "Defeat at least 400 enemies", count: "400", tags: [], active: "true" },
                { id: "6", mode: "hard", title: "Live in Light", description: "Win at least 50 battles with a squad of all light side units", count: "50", tags: [], active: "true" },
                { id: "7", mode: "normal", title: "Live in Light", description: "Win at least 35 battles with a squad of all light side units", count: "35", tags: [], active: "true" },
                { id: "8", mode: "hard", title: "Lucky Shot", description: "Score at least 1500 Critical Hits", count: "1500", tags: [], active: "true" },
                { id: "9", mode: "normal", title: "Lucky Shot", description: "Score at least 750 Critical Hits", count: "750", tags: [], active: "true" },
                { id: "10", mode: "hard", title: "Mental Challenge", description: "Deal at least 2,000,000 Special damage", count: "1", tags: [], active: "false" },
                { id: "11", mode: "normal", title: "Mental Challenge", description: "Deal at least 1,000,000 Special damage", count: "1", tags: [], active: "false" },
                { id: "12", mode: "hard", title: "Recovery Expert", description: "Recover at least 1,500,000 points of Health", count: "1", tags: [], active: "false" },
                { id: "13", mode: "normal", title: "Recovery Expert", description: "Recover at least 1,000,000 points of Health", count: "1", tags: [], active: "false" },
                { id: "14", mode: "hard", title: "Simple Tricks", description: "Use special abilities 700 times", count: "700", tags: [], active: "false" },
                { id: "15", mode: "normal", title: "Simple Tricks", description: "Use special abilities at least 500 times", count: "500", tags: [], active: "false" },
                { id: "16", mode: "hard", title: "Unguarded", description: "Win 20 battles with no tanks in your squad", count: "20", tags: [], active: "true" },
                { id: "17", mode: "normal", title: "Unguarded", description: "Win 10 battles with no Tanks in your squad", count: "10", tags: [], active: "true" },
            ],
            sector_feats: [
                { id: "0", mode: "hard", title: "All Jedi", description: "Win at least 14 battles with a full Squad of Jedi units", count: "14", tags: [], sector: "2" },
                { id: "1", mode: "normal", title: "All Jedi", description: "Win at least 7 battles with a full Squad of Jedi units", count: "7", tags: [], sector: "2" },
                { id: "2", mode: "hard", title: "All Sith", description: "Win at least 14 battles with a full Squad of Sith units", count: "14", tags: [], sector: "3" },
                { id: "3", mode: "normal", title: "All Sith", description: "Win at least 7 battles with a full Squad of Sith units", count: "7", tags: [], sector: "3" },
                { id: "4", mode: "hard", title: "Bombs Away", description: "Inflict at least 100 Thermal Detonators on enemies", count: "100", tags: [], sector: "3" },
                { id: "5", mode: "normal", title: "Bombs Away", description: "Inflict at least 50 Thermal Detonators on enemies", count: "50", tags: [], sector: "3" },
                { id: "6", mode: "hard", title: "Critical Success", description: "Gain Advantage 40 times", count: "40", tags: [], sector: "1" },
                { id: "7", mode: "normal", title: "Critical Success", description: "Gain Advantage 20 times", count: "20", tags: [], sector: "1" },
                { id: "8", mode: "hard", title: "Disarmed", description: "Win 10 battles with no Attackers in your squad", count: "10", tags: [], sector: "4" },
                { id: "9", mode: "normal", title: "Disarmed", description: "Win 5 battles with no Attackers in your squad", count: "5", tags: [], sector: "4" },
                { id: "10", mode: "hard", title: "Flawless Victory", description: "Win at least 20 battles without losing any units", count: "20", tags: [], sector: "1" },
                { id: "11", mode: "normal", title: "Flawless Victory", description: "Win at least 10 battles without losing any units", count: "10", tags: [], sector: "1" },
                { id: "12", mode: "hard", title: "Fleet-Footed", description: "Evade at least 100 attacks", count: "100", tags: [], sector: "5" },
                { id: "13", mode: "normal", title: "Fleet-Footed", description: "Evade at least 50 attacks", count: "50", tags: [], sector: "5" },
                { id: "14", mode: "hard", title: "Grand Victory", description: "Defeat at least 200 enemies", count: "200", tags: [], sector: "5" },
                { id: "15", mode: "normal", title: "Grand Victory", description: "Defeat at least 100 enemies", count: "100", tags: [], sector: "5" },
                { id: "16", mode: "hard", title: "Lucky Shot", description: "Score at least 200 Critical Hits", count: "200", tags: [], sector: "1,4" },
                { id: "17", mode: "normal", title: "Lucky Shot", description: "Score at least 100 Critical Hits", count: "100", tags: [], sector: "1,4" },
                { id: "18", mode: "hard", title: "One by One", description: "Inflict Marked on at least 40 enemies", count: "40", tags: [], sector: "4" },
                { id: "19", mode: "normal", title: "One by One", description: "Inflict Marked on at least 20 enemies", count: "20", tags: [], sector: "4" },
                { id: "20", mode: "hard", title: "Opportunistic Advance", description: "Attack out of turn 100 times", count: "100", tags: [], sector: "2" },
                { id: "21", mode: "normal", title: "Opportunistic Advance", description: "Attack out of turn 50 times", count: "50", tags: [], sector: "2" },
                { id: "22", mode: "hard", title: "Simple Tricks", description: "Use special abilities at least 150 times", count: "150", tags: [], sector: "None" },
                { id: "23", mode: "normal", title: "Simple Tricks", description: "Use special abilities at least 100 times", count: "100", tags: [], sector: "None" },
                { id: "24", mode: "hard", title: "Super Support", description: "Grant at least 100 buffs to allies", count: "100", tags: [], sector: "2" },
                { id: "25", mode: "normal", title: "Super Support", description: "Grant at least 50 buffs to allies", count: "50", tags: [], sector: "2" },
                { id: "26", mode: "hard", title: "The Slow Game", description: "Inflict at least 300 Damage Over Time effects on enemies", count: "300", tags: [], sector: "5" },
                { id: "27", mode: "normal", title: "The Slow Game", description: "Inflict at least 200 Damage Over Time effects on enemies", count: "200", tags: [], sector: "5" },
                { id: "28", mode: "hard", title: "Wreak Havoc", description: "Inflict at least 100 debuffs on enemies", count: "100", tags: [], sector: "3" },
                { id: "29", mode: "normal", title: "Wreak Havoc", description: "Inflict at least 50 debuffs on enemies", count: "50", tags: [], sector: "3" },
            ],
            boss_feats: [
                { id: "0", mode: "hard", title: "Chain Attack", description: "Complete the battle after taking 15 or more consecutive turns before the enemy takes a turn", count: "1", tags: [], sector: "1" },
                { id: "1", mode: "normal", title: "Chain Attack", description: "Complete the battle after taking 10 or more consecutive turns before the enemy takes a turn", count: "1", tags: [], sector: "1" },
                { id: "2", mode: "hard", title: "Devastating Strike", description: "Deal at least 200,000 damage to an enemy in a single hit", count: "1", tags: [], sector: "1" },
                { id: "3", mode: "normal", title: "Devastating Strike", description: "Deal at least 100,000 damage to an enemy in a single hit", count: "1", tags: [], sector: "1" },
                { id: "4", mode: "hard", title: "Crush Them", description: "Defeat at least 4 enemies in the same turn", count: "1", tags: [], sector: "1" },
                { id: "5", mode: "normal", title: "Crush Them", description: "Defeat at least 3 enemies in the same turn", count: "1", tags: [], sector: "1" },
                { id: "6", mode: "hard", title: "Simple Trick", description: "Win without using more than 6 special abilities", count: "1", tags: [], sector: "2" },
                { id: "7", mode: "normal", title: "Simple Trick", description: "Win without using more than 10 special abilities", count: "1", tags: [], sector: "2" },
                { id: "8", mode: "hard", title: "Unguarded", description: "Win the battle with no Tanks in your squad", count: "1", tags: [], sector: "2" },
                { id: "9", mode: "normal", title: "Unguarded", description: "Win the battle with no Tanks in your squad", count: "1", tags: [], sector: "2" },
                { id: "10", mode: "hard", title: "Hindered Movement", description: "Remove from enemies at least 700% Turn Meter (total)", count: "1", tags: [], sector: "2" },
                { id: "11", mode: "normal", title: "Hindered Movement", description: "Remove from enemies at least 500% Turn Meter (total)", count: "1", tags: [], sector: "2" },
                { id: "12", mode: "hard", title: "Flawless Victory", description: "Win without losing any units ", count: "1", tags: [], sector: "3" },
                { id: "13", mode: "normal", title: "Flawless Victory", description: "Win without losing any units ", count: "1", tags: [], sector: "3" },
                { id: "14", mode: "hard", title: "Lucky Shot", description: "Score at least 40 Critical Hits", count: "1", tags: [], sector: "3" },
                { id: "15", mode: "normal", title: "Lucky Shot", description: "Score at least 30 Critical Hits", count: "1", tags: [], sector: "3" },
                { id: "16", mode: "hard", title: "No Old Republic", description: "Win without using any Old Republic characters in your squad ", count: "1", tags: [], sector: "3" },
                { id: "17", mode: "normal", title: "No Old Republic", description: "Win without using any Old Republic characters in your squad ", count: "1", tags: [], sector: "3" },
                { id: "18", mode: "hard", title: "Hindered Movement", description: "Remove from enemies at least 700% Turn Meter (total)", count: "1", tags: [], sector: "4" },
                { id: "19", mode: "normal", title: "Hindered Movement", description: "Remove from enemies at least 500% Turn Meter (total)", count: "1", tags: [], sector: "4" },
                { id: "20", mode: "hard", title: "Opportunistic Advance", description: "Attack out of turn at least 30 times", count: "1", tags: [], sector: "4" },
                { id: "21", mode: "normal", title: "Opportunistic Advance", description: "Attack out of turn at least 20 times", count: "1", tags: [], sector: "4" },
                { id: "22", mode: "hard", title: "Unsupportive", description: "Win without using any Support units in your squad", count: "1", tags: [], sector: "4" },
                { id: "23", mode: "normal", title: "Unsupportive", description: "Win without using any Support units in your squad", count: "1", tags: [], sector: "4" },
                { id: "24", mode: "hard", title: "Going Critical", description: "Score at least 20 critical hits in a row during ally turns", count: "1", tags: [], sector: "5" },
                { id: "25", mode: "normal", title: "Going Critical", description: "Score at least 10 critical hits in a row during ally turns", count: "1", tags: [], sector: "5" },
                { id: "26", mode: "hard", title: "Guarded Assault", description: "Win without losing any Attackers ", count: "1", tags: [], sector: "5" },
                { id: "27", mode: "normal", title: "Guarded Assault", description: "Win without losing any Attackers ", count: "1", tags: [], sector: "5" },
                { id: "28", mode: "hard", title: "Recovery Expert", description: "Recover at least 500,000 points of Health", count: "1", tags: [], sector: "5" },
                { id: "29", mode: "normal", title: "Recovery Expert", description: "Recover at least 300,000 points of Health", count: "1", tags: [], sector: "5" },
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
            keycards: "200",
            mode: "hard",
            event_feats: [{id: "0", count: "20"}, {id: "1", count: "20"}, {id: "2", count: "20"}],
            sector_feats: [{id: "0", count: "20"}, {id: "1", count: "20"}, {id: "2", count: "20"}],
            //battle progress
            //boss progress
        }

        this.state = { teams: DATA_TEAMS, conquest_template: DATA_CONQUEST_TEMPLATE, progress: DATA_CONQUEST_PROGRESS };
    }

    componentDidMount() {
        let sector_feats = this.state.conquest_template.sector_feats;
        let all_event_feats = this.state.conquest_template.event_feats;
        let mode = this.state.progress.mode;

        //filter out all the related feats based on mode and sector
        let sector_1_feats = sector_feats.filter(feat => feat.sector.indexOf("1")>-1 && feat.mode===mode);
        let sector_2_feats = sector_feats.filter(feat => feat.sector.indexOf("2")>-1 && feat.mode===mode);
        let sector_3_feats = sector_feats.filter(feat => feat.sector.indexOf("3")>-1 && feat.mode===mode);
        let sector_4_feats = sector_feats.filter(feat => feat.sector.indexOf("4")>-1 && feat.mode===mode);
        let sector_5_feats = sector_feats.filter(feat => feat.sector.indexOf("5")>-1 && feat.mode===mode);

        let active_event_feats = all_event_feats.filter(feat => feat.active==="true" && feat.mode===mode);

        //store the active feats in the state
        this.setState({event_feats: active_event_feats, s1_feats: sector_1_feats, s2_feats: sector_2_feats, s3_feats: sector_3_feats, s4_feats: sector_4_feats, s5_feats: sector_5_feats });
    }

    render() {
        let keycards = this.state.progress.keycards;
        let keycards_needed = this.state.conquest_template.chests[0].keycards_needed;
        let days_left = 12;
        let end_date = this.state.conquest_template.end_date;
        
        const {event_feats, s1_feats, s2_feats, s3_feats, s4_feats, s5_feats} = this.state;

        return (
            <div className="progress-tracker">
                <ChestProgress keycards={keycards} keycards_needed={keycards_needed} days_left={days_left} end_date={end_date} />
                <SectorPanel title="Event Feats" startOpen={true} feats={event_feats} keycards="9"/>
                <SectorPanel title="Sector 1" feats={s1_feats} keycards_each="5"/>
                <SectorPanel title="Sector 2" feats={s2_feats} keycards_each="5"/>
                <SectorPanel title="Sector 3" feats={s3_feats} keycards_each="10"/>
                <SectorPanel title="Sector 4" feats={s4_feats} keycards_each="10"/>
                <SectorPanel title="Sector 5" feats={s5_feats} keycards_each="15"/>
                <p>notes</p>
            </div>
        )
    }
}
export default ProgressTracker;