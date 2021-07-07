/**
 * BattleStars.js
 * container for tracking how many stars/keycards are left from battles
 */
 import React, { Component } from 'react';
 
 class BattleStars extends Component {
     render() {
         return (
                 <div className="feat-wrapper">
                     <h2>Keycards from Battles:</h2>
                     <p>{this.props.stars_3} 3 star battles</p>
                     <p>{this.props.stars_2} 2 star battles</p>
                     <p>{this.props.stars_1} 1 star battles</p>
                 </div>
         )
     }
 }
 export default BattleStars;