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

    handleClick = () => {
        this.setState({ open: !this.state.open });
    }
    render() {
        const title = this.props.title;
        const open = this.state.open;
        return (
            <div className="sector-panel" onClick={this.handleClick}>
                <div className="panel-heading">
                    <h1>{title}</h1>
                    {open === true ? <ExpandLess fontSize="large" /> : <ExpandMore fontSize="large" />}
                </div>
                {open === true ?
                    <div className="panel-content">
                        <BattleStars stars_3="3" stars_2="8" stars_1="2"/>
                        <Feat title="Feat Title" progress="Critical Hits 0/30" id="0" keycards="2"/>
                        <Feat title="Feat Title" progress="No tanks 0/20" id="0" keycards="7"/>
                        <BossFeat title="Feat Title" progress="No tanks 0/20" id="0" />

                    </div>
                    : ''}
            </div>
        )
    }
}
export default SectorPanel;