/** 
* ChestProgress.js
* section for tracking progress of chests
*/
import React, { Component } from 'react';

class ChestProgress extends Component {
    render() {
        const keycards = this.props.keycards;
        const keycards_needed = this.props.keycards_needed;
        const days_left = this.props.days_left;
        const end_date = this.props.end_date;
        return (
            <div className="chest-progress">
                <h1>Chest Progress</h1>
                <p>
                {keycards} / {keycards_needed}<br />
                {days_left} days left in conquest. (ends on {end_date})
                </p>
            </div>
        )
    }
}
export default ChestProgress;