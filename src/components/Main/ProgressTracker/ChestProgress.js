/** 
* ChestProgress.js
* section for tracking progress of chests
*/
import React, { Component } from 'react';

class ChestProgress extends Component {
    render() {
        //{ id: "0", description: "Hard-01", keycards_needed: "65", rewards: [{ item_name: "Commander Ahsoka Tano", quantity: 25 }, { item_name: "Razor Crest", quantity: 20 },] },
        const {keycards, active_chest} = this.props;
        const {description, keycards_needed, rewards} = active_chest;

        return (
            <div className="chest-progress">
                <h1>Chest Progress - {description}</h1>
                <p>
                {keycards} / {keycards_needed}<br />
                </p>
                <p>Rewards: {JSON.stringify(rewards)}</p>
            </div>
        )
    }
}
export default ChestProgress;