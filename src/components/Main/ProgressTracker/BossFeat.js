/**
 * BossFeat.js
 * container for a boss feats to be tracked, similar to Feat.js, but with extra features
 */
import React, { Component } from 'react';
import { Checkbox, FormControlLabel } from '@material-ui/core';

class BossFeat extends Component {
    constructor(props) {
        super(props);
        this.state = { id: false, complete: "false" };
    }

     //get the data from props and store it in the state
     //props received from SectorBoss: <BossFeat progress key={feat.id} feat={feat} boss_keycards={boss_keycards} onFeatUpdate={this.handleFeatUpdate}/>);
     //{""boss_progress":[{"sector_id":"1","stars":1,"feats":[{"id":"0","complete":"false","keycards":"0"}]},{"sector_id":"5","stars":0,"feats":[{"id":"74","complete":"true","keycards":"6"},{"id":"76","complete":"true","keycards":"6"},{"id":"78","complete":"true","keycards":"6"}]}]}
     static getDerivedStateFromProps(props, state) {
        let id = props.boss_feat.id;
        let complete = props.complete;
        return { id: id, complete: complete };
    }

    handleFeatUpdate = () => {
        console.log("BossFeat, updating")
        let complete = this.state.complete;
        complete = (complete === "true") ? "false" : "true";
        this.props.onFeatUpdate({ type: "boss_feat", id: this.state.id, boss_keycards: this.props.boss_keycards, complete: complete });
    }

    render() {
        const { boss_feat, boss_keycards } = this.props;
        const { complete } = this.state;
        return (
            <div className="boss-feat-wrapper">

                <div>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={complete === "true" ? true : false}
                                onChange={this.handleFeatUpdate}
                                name="mark_complete"
                                color="default"
                            />
                        }
                    />
                    <span><strong>{boss_feat.title}</strong> - {boss_feat.description} ({boss_keycards})</span>
                </div>
                <div className="hidden">{JSON.stringify(this.props)}</div>
            </div>
        )
    }
}
export default BossFeat;