/** 
* ChestProgress.js
* section for tracking progress of chests
*/
import img_keycard from '../../../images/keycard.png';
//https://github.com/gm0t/react-sticky-el
import Sticky from 'react-sticky-el';
import React, { Component } from 'react';

class ChestProgress extends Component {
    render() {
        //{ id: "0", description: "Hard-01", keycards_needed: "65", rewards: [{ item_name: "Commander Ahsoka Tano", quantity: 25 }, { item_name: "Razor Crest", quantity: 20 },] },
        const { keycards, active_chest } = this.props;
        const { description, keycards_needed, rewards, icon } = active_chest;

        let rewards_jsx = rewards ? rewards.map(r => <div key={r.item_name} className="reward-row">{r.item_name} <img src={r.icon} alt={r.item_name + " icon"} className="reward-icon" />x{r.quantity}</div>) : '';

        return (
            <Sticky>
                <div className="chest-progress">
                    <h1 className="hide-on-stuck">Chest Progress - {description}</h1>
                    <p>
                        <img src={icon} alt={description + " crate icon"} className="crate-icon" />
                        {keycards} / {keycards_needed} <img src={img_keycard} alt="keycard icon" className="currency-icon" /><br />
                    </p>
                    <h3 className="hide-on-stuck">Rewards: </h3>
                    <div className="hide-on-stuck">
                        {rewards_jsx}
                    </div>
                </div>
            </Sticky>
        )
    }
}
export default ChestProgress;