/**
 * TimeLeft.js
 * component for showing remaining time
 */
import React from 'react';

const TimeLeft = ({ end_date }) => {

    //get the date, but force it to be est, because that's what the conquest template is in (cause I made it)
    const d_now = new Date(new Date().toLocaleString("en-US", { timeZone: "America/New_York" })); // timezone ex: America/New_York, America/Los_Angeles 
    const d_end = new Date(end_date).getTime();
    const diff_ms = (d_end - d_now);
    const days_left = Math.floor(diff_ms / (1000 * 60 * 60 * 24))
    const hours_left = Math.floor((diff_ms / (1000 * 60 * 60)) % 24);

    return (
        <div className="time-left">
            <p>
                <strong>Time Left: </strong>
                <span>{days_left} days {hours_left} hours. <em>(ends on {new Date(end_date).toLocaleDateString()} at {new Date(end_date).toLocaleTimeString()} EST)</em></span>
            </p>
        </div>

    );
}

export default TimeLeft;