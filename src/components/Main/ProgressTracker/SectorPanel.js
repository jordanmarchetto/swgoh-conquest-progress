/** 
* SectorPanel.js
* expandable container for sectors/global feats, basically an accordion panel
*/
import React, { Component } from 'react';
import BattleStars from "./BattleStars";
import Feat from "./Feat";
import BossFeat from "./BossFeat";

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
        let ui_settings = localStorage.getItem("ui_settings")?JSON.parse(localStorage.getItem("ui_settings")):{panels: []};
        let all_panels = ui_settings.panels.filter(s => s.panel_id !== id);
        let panel_settings = {panel_id: id, open: open};
        all_panels.push(panel_settings);
        ui_settings.panels = all_panels;

        localStorage.setItem("ui_settings", JSON.stringify(ui_settings));
    }
    render() {
        const open = this.state.open;
        const { progress } = this.props;
        const { id, title, keycards_each, feats, type } = this.props.sector;
        const progressUpdateCallback = this.props.onProgressUpdate;

        //progress obj be like:
        //  keycards: 20,
        //  mode: "hard",
        //  feats: [{id: "4", count: "21", complete: "true", keycards: "5"}, {id: "6", count: "22", complete: "true", keycards: "5"} ],
        let feats_elems = [];
        if (feats !== undefined) {
            feats.forEach(function (feat) {
                let progress_ele = progress.feats.filter(f => f.id === feat.id)[0];
                feats_elems.push(<Feat key={feat.id} feat={feat} keycards={keycards_each} progress={progress_ele} onProgressUpdate={progressUpdateCallback} />);
            });
        }

        return (
            <div className="sector-panel">
                <div className="panel-heading" onClick={this.togglePanel}>
                    <h1 className="panel-toggle">{title}</h1>
                    {open === true ? <ExpandLess fontSize="large" className="panel-toggle" /> : <ExpandMore fontSize="large" className="panel-toggle" />}
                </div>
                {open === true ?
                    <div className="panel-content">
                        {type === "sector" ? <BattleStars progress={progress} sector_id={id} stars_3="3" stars_2="8" stars_1="2" onProgressUpdate={progressUpdateCallback}  /> : ''}
                        {feats_elems}
                        {type === "sector" ? <BossFeat progress={progress} sector_id={id} title="Feat Title" id="0" /> : ''}
                    </div>
                    : ''}
            </div>
        )
    }
}
export default SectorPanel;