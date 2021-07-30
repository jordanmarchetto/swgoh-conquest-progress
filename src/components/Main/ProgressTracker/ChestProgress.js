/** 
* ChestProgress.js
* section for tracking progress of chests
*/
import img_keycard from '../../../images/keycard.png';
//https://github.com/gm0t/react-sticky-el
import Sticky from 'react-sticky-el';
import { LinearProgress } from '@material-ui/core';
import React from 'react';

const ChestProgress = ({ keycards, active_chest, prev_chest_max }) => {
    //{ id: "0", description: "Hard-01", keycards_needed: "65", rewards: [{ item_name: "Commander Ahsoka Tano", quantity: 25 }, { item_name: "Razor Crest", quantity: 20 },] },
    const { description, keycards_needed, rewards, icon } = active_chest;

    //get the jsx for the rewards in this crate
    const rewards_jsx = rewards ? rewards.map(r => <div key={r.item_name} className="reward-row">{r.item_name} <img src={r.icon} alt={r.item_name + " icon"} className="reward-icon" />x{r.quantity}</div>) : '';

    //calc the progress percent
    const progress_percent = ((Number(keycards) - prev_chest_max) / (Number(keycards_needed) - prev_chest_max)) * 100;
    return (
        <Sticky>
            <div className="chest-progress">
                <h1 className="hide-on-stuck">Chest Progress - {description}</h1>
                <p>
                    <img src={icon} alt={description + " crate icon"} className="crate-icon" />
                    {keycards} / {keycards_needed} <img src={img_keycard} alt="keycard icon" className="currency-icon" /><br />
                </p>
                <LinearProgress variant="determinate" value={progress_percent} />
                <h3 className="hide-on-stuck">Rewards: </h3>
                <div className="hide-on-stuck">
                    {rewards_jsx}
                </div>
            </div>
        </Sticky>
    );
}

export default ChestProgress;