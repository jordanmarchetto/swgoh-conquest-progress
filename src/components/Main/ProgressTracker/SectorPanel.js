/** 
* SectorPanel.js
* expandable container for sectors/global feats, basically an accordion panel
*/
import React, { Component } from 'react';
import BattleStars from "./BattleStars";
import Feat from "./Feat";
import SectorBoss from "./SectorBoss";
import img_keycard from '../../../images/keycard.png';
import { ExpandMore, ExpandLess } from '@material-ui/icons';

class SectorPanel extends Component {

    constructor(props) {
        super(props);
        this.state = { open: false };
    }

    componentDidMount() {
        //check for startOpen prop
        if (this.props.startOpen === true) {
            this.setState({ open: true });
        }
    }

    //figure out how many keys we've earned
    calculate_earned_keycards = () => {
        let count = 0;
        //calculate feat keycards
        let feats = this.props.progress.feats.filter(f => f.sector === this.props.sector.id && f.complete==="true");
        feats.forEach(f => count += Number(f.keycards));

        //from the progress array, grab the battle progress for this sector
        let battle_stars = 0;
        const battle_prog = this.props.progress.battle_progress.filter(b => b.sector_id === this.props.sector.id)[0];
        if( battle_prog !== undefined){
            battle_stars += battle_prog.stars.stars_1 * 1;
            battle_stars += battle_prog.stars.stars_2 * 2;
            battle_stars += battle_prog.stars.stars_3 * 3;
        }
        count += battle_stars;

        //from the progress array, grab the battle progress for this sector
        let boss_stars = 0;
        const boss_progress = this.props.progress.boss_progress.filter(b => b.sector_id === this.props.sector.id)[0];
        if(boss_progress !== undefined){
            boss_progress.feats.filter(f => f.complete === "true").forEach(f => boss_stars += Number(f.keycards));
            boss_stars += boss_progress.stars ? boss_progress.stars : 0;
        }
        count+= boss_stars;

        return count;
    }
    //figure out how many keys we could have
    calculate_max_keycards = () => {
        let count = 0;
        //count normal feats
        const feats = this.props.sector.feats.filter(f => f.type === "sector" || f.type === "event");
        feats.forEach(f => count += Number(this.props.sector.keycards_each));
        const num_battles = this.props.sector.type !== "event" ? Number(this.props.sector.num_battles) : 0;
        count += (3 * num_battles); //max battle stars
        //count boss feats
        const boss_feats = this.props.sector.feats.filter(f => f.type === "boss");
        boss_feats.forEach(f => count += Number(this.props.sector.boss_feat_keycards));
        count += this.props.sector.type !== "event" ? 3 : 0; //max boss battle stars
        return count;
    }

    //open/close the panel when you click the heading div
    togglePanel = (e) => {
        let open = !this.state.open;
        //if you hit certain parts of the icon/svg, this won't work, but I don't really care.
        if (e.target.className === "panel-heading" || e.target.className === "panel-toggle") {
            this.setState({ open: open });
        }

        //whenever we toggle the panel, update the local storage with info about that panel,
        //specifically, all we really care about is open/close
        const id = this.props.id;
        let ui_settings = localStorage.getItem("ui_settings") ? JSON.parse(localStorage.getItem("ui_settings")) : { panels: [] };
        let all_panels = ui_settings.panels.filter(s => s.panel_id !== id);
        let panel_settings = { panel_id: id, open: open };
        all_panels.push(panel_settings);
        ui_settings.panels = all_panels;

        localStorage.setItem("ui_settings", JSON.stringify(ui_settings));
    }

    render() {
        const open = this.state.open;
        const { progress } = this.props;
        const { id, title, keycards_each, feats, type, num_battles, boss_feat_keycards, boss_team } = this.props.sector;
        const progressUpdateCallback = this.props.onProgressUpdate;
        const battleProgressUpdateCallback = this.props.onBattleUpdate;
        const bossProgressUpdateCallback = this.props.onBossUpdate;
        const boss_feats = feats.filter(f => f.type === "boss");

        //progress obj be like:
        //  keycards: 20,
        //  mode: "hard",
        //  feats: [{id: "4", count: "21", complete: "true", keycards: "5"}, {id: "6", count: "22", complete: "true", keycards: "5"} ],
        let feats_elems = [];
        if (feats !== undefined) {
            feats.forEach(function (feat) {
                if (feat.type !== "sector" && feat.type !== "event") {
                    return;
                }
                let progress_ele = progress.feats.filter(f => f.id === feat.id)[0];
                feats_elems.push(<Feat key={feat.id} feat={feat} keycards={keycards_each} progress={progress_ele} onProgressUpdate={progressUpdateCallback} />);
            });
        }

        return (

            <div className={open === true ? "sector-panel panel-open" : "sector-panel panel-closed"} id={"sector-panel-" + this.props.id}>
                <div className="panel-heading" onClick={this.togglePanel}>
                    <h1 className="panel-toggle">{title}</h1>
                    <h2 className="sector-progress">{this.calculate_earned_keycards()} / {this.calculate_max_keycards()}<img src={img_keycard} alt="keycard icon" className="sector-keycard-icon" /></h2>
                    {open === true ? <ExpandLess fontSize="large" className="panel-toggle" /> : <ExpandMore fontSize="large" className="panel-toggle" />}
                </div>
                {open === true ?
                    <div className="panel-content">
                        <div className="hidden"> {JSON.stringify(this.props)} </div>
                        {type === "sector" ? <BattleStars progress={progress} sector_id={id} onBattleProgressUpdate={battleProgressUpdateCallback} num_battles={num_battles} /> : ''}
                        {feats_elems}
                        {type === "sector" ? <SectorBoss progress={progress} sector_id={id} boss_team={boss_team} boss_keycards={boss_feat_keycards} boss_feats={boss_feats} onBossProgressUpdate={bossProgressUpdateCallback} /> : ''}
                    </div>
                    : ''}
            </div>
        )
    }
}
export default SectorPanel;