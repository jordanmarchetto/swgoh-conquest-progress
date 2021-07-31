/**
 * BossFeat.js
 * container for a boss feats to be tracked, similar to Feat.js, but with extra features
 */
import React from 'react';
import img_keycard from '../../../images/keycard.png';
import { Checkbox, FormControlLabel } from '@material-ui/core';

const BossFeat = (props) => {

    //props received from SectorBoss: <BossFeat progress key={feat.id} feat={feat} boss_keycards={boss_keycards} onFeatUpdate={this.handleFeatUpdate}/>);
    //{""boss_progress":[{"sector_id":"1","stars":1,"feats":[{"id":"0","complete":"false","keycards":"0"}]},{"sector_id":"5","stars":0,"feats":[{"id":"74","complete":"true","keycards":"6"},{"id":"76","complete":"true","keycards":"6"},{"id":"78","complete":"true","keycards":"6"}]}]}
    //dereference props here, so that we can output the whole props array later
    const { complete, boss_feat, boss_keycards, onFeatUpdate } = props;

    const handleFeatUpdate = () => {
        //console.log("BossFeat, updating")
        const updated_complete = (complete === "true") ? "false" : "true";
        onFeatUpdate({ type: "boss_feat", id: boss_feat.id, boss_keycards: boss_keycards, complete: updated_complete });
    }

    return (
        <div className="boss-feat-wrapper">
            <div>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={complete === "true" ? true : false}
                            onChange={handleFeatUpdate}
                            name="mark_complete"
                            color="default"
                        />
                    }
                />
                <span><strong>{boss_feat.title}</strong> - {boss_feat.description} ({boss_keycards}<img src={img_keycard} alt="keycard icon" className="boss-feat-keycard-icon" />)</span>
            </div>
            <div className="hidden">{JSON.stringify(props)}</div>
        </div>
    );
}

export default BossFeat;