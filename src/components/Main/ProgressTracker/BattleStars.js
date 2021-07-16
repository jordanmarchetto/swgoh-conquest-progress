/**
 * BattleStars.js
 * container for tracking how many stars/keycards are left from battles
 */
import React, { Component } from 'react';
import { IconButton } from '@material-ui/core';
import { Add, Remove, Block } from '@material-ui/icons';
import icon_star from '../../../images/icon_star.png';
class BattleStars extends Component {

    constructor(props) {
        super(props);
        this.state = { sector_id: false, stars: { stars_1: 0, stars_2: 0, stars_3: 0 } };
    }
    //get the data from props and store it in the state
    static getDerivedStateFromProps(props, state) {
        const { progress, sector_id } = props;
        const battle_progress = progress.battle_progress.filter(bp => bp.sector_id === sector_id)[0];
        const { stars_1, stars_2, stars_3 } = battle_progress ? battle_progress.stars : { stars_1: 0, stars_2: 0, stars_3: 0 };
        return { sector_id: sector_id, stars: { stars_1: stars_1, stars_2: stars_2, stars_3: stars_3 } };
    }

    //update the star count
    // handles any star_ value and both directions (incr/decr)
    updateCount = (stars, direction) => {
        let count = 0;
        let bp = this.state.stars;
        const max_battles = this.props.num_battles;
        count = Number(this.state.stars[stars]);
        count = (direction === "up")?count+1:count-1;
        count = (count <= 0) ? 0 : count;
        count = (count >= max_battles) ? max_battles : count;
        bp[stars] = count;
  
        this.props.onBattleProgressUpdate({ sector_id: this.props.sector_id, stars: bp });
    }
  
    //make sure we haven't entered the results of more battles than is possible
    validStarCount = () => {
        let star_total = Number(this.state.stars.stars_1) + Number(this.state.stars.stars_2) + Number(this.state.stars.stars_3);
        if(star_total <= Number(this.props.num_battles)){
            return true;
        } else{
            return false;
        }
    }
    render() {
        const { stars_1, stars_2, stars_3 } = this.state.stars;
        return (
            <div className="feat-wrapper">
                <h2>Keycards from Battles:</h2>
                {this.validStarCount() ?"":<span><Block />Too many battles entered, can't exceed {this.props.num_battles}</span>}
                <div>
                    {Number(stars_1)} - <img src={icon_star} alt="star icon" /> battles
                    <IconButton aria-label="add" onClick={() => this.updateCount("stars_1","up")} color="default"><Add /></IconButton>
                    <IconButton aria-label="remove" onClick={() => this.updateCount("stars_1","down")} color="default"><Remove /></IconButton>
                </div>
                <div>
                    {stars_2} - <img src={icon_star} alt="star icon" /><img src={icon_star} alt="star icon" /> battles
                    <IconButton aria-label="add" onClick={() => this.updateCount("stars_2","up")} color="default"><Add /></IconButton>
                    <IconButton aria-label="remove" onClick={() => this.updateCount("stars_2","down")} color="default"><Remove /></IconButton>                </div>
                <div>
                    {stars_3} - <img src={icon_star} alt="star icon" /><img src={icon_star} alt="star icon" /><img src={icon_star} alt="star icon" /> battles
                    <IconButton aria-label="add" onClick={() => this.updateCount("stars_3","up")} color="default"><Add /></IconButton>
                    <IconButton aria-label="remove" onClick={() => this.updateCount("stars_3","down")} color="default"><Remove /></IconButton>                </div>
            </div>
        )
    }
}
export default BattleStars;