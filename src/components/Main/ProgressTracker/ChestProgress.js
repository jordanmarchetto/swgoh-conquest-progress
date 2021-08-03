/** 
* ChestProgress.js
* section for tracking progress of chests
*/
import img_keycard from '../../../images/keycard.png';
//https://github.com/gm0t/react-sticky-el
import Sticky from 'react-sticky-el';
import TimeLeft from './TimeLeft';
import { LinearProgress, Tooltip } from '@material-ui/core';
import React from 'react';
import { ExpandMore, ExpandLess } from '@material-ui/icons';

const ChestProgress = ({ keycards, active_chest, prev_chest_max, end_date }) => {
    //{ id: "0", description: "Hard-01", keycards_needed: "65", rewards: [{ item_name: "Commander Ahsoka Tano", quantity: 25 }, { item_name: "Razor Crest", quantity: 20 },] },
    const { description, keycards_needed, rewards, icon, mode } = active_chest;

    //state tracking for toggling rewards
    const [rewardsOpen, setRewardsOpen] = React.useState(false);
    const toggleRewardsOpen = () => setRewardsOpen(open => !open);

    //get the jsx for the rewards in this crate
    const rewards_jsx = rewards ? rewards.map(r => <div key={r.item_name} className="reward-row">{r.item_name} <Tooltip title={r.item_name + " Character Shards"} arrow placement="top"><img src={r.icon} alt={r.item_name + " icon"} className="reward-icon" /></Tooltip>x{r.quantity}</div>) : '';

    //calc the progress percent
    const progress_percent = ((Number(keycards) - prev_chest_max) / (Number(keycards_needed) - prev_chest_max)) * 100;
    return (
        <Sticky className="chest-progress-wrapper">
            <div className="chest-progress">
                <div className="hide-on-stuck"><TimeLeft end_date={end_date} /></div>
                <h1 className="hide-on-stuck">Chest Progress - {description}</h1>
                <div className="keycard-progress-wrapper">
                    <p className="crate-keycard-progress">
                    <Tooltip title={description + " Crate (" + mode + ")"} arrow placement="top">
                        <img src={icon} alt={description + " crate icon"} className="crate-icon" />
                        </Tooltip>
                        {keycards} / {keycards_needed} <img src={img_keycard} alt="keycard icon" className="currency-icon" /><br />
                    </p>
                    <div className="progress-bar-wrapper">
                        <LinearProgress variant="determinate" value={progress_percent} color="secondary" />
                    </div>
                    <div className="break"></div>
                </div>

                <div className="rewards-wrapper hide-on-stuck">
                    <h3 className="hide-on-stuck rewards-toggle" onClick={toggleRewardsOpen}>Rewards {rewardsOpen === true ? <ExpandLess fontSize="medium" className="rewards-toggle" /> : <ExpandMore fontSize="medium" className="rewards-toggle" />}</h3>
                    {rewardsOpen === true ?
                        <div className="hide-on-stuck">
                            {rewards_jsx}
                        </div>
                        : ""}
                </div>
            </div>
        </Sticky>
    );
}

export default ChestProgress;