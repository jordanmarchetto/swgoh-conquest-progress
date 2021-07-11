/**
 * TimeLeft.js
 * component for showing remaining time
 */
import React, { Component } from 'react';

class TimeLeft extends Component {
    render() {
                const {end_date} = this.props;
        
                //get the date, but force it to be est, because that's what the conquest template is in (cause I made it)
                let d_now = new Date(new Date().toLocaleString("en-US", {timeZone: "America/New_York"})); // timezone ex: America/New_York, America/Los_Angeles 
                let d_end = new Date(end_date).getTime();
                let diff_ms = (d_end - d_now);
                let days_left = Math.floor(diff_ms/(1000*60*60*24))
                let hours_left = Math.floor((diff_ms/(1000*60*60))%24);


        return (
            <div className="time-left">
                <h3>Time Left</h3>
                {days_left} days {hours_left} hours left in conquest. (ends on {end_date})            
            </div>
        )
    }
}
export default TimeLeft;