/**
 * BossFeat.js
 * container for a boss feats to be tracked, similar to Feat.js, but with extra features
 */
 import React, { Component } from 'react';
 
 class BossFeat extends Component {
     render() {
         return (
                 <div className="feat-wrapper">
                     <h2>Boss: {this.props.title}</h2>
                     <span>{this.props.id}</span>
                 </div>
         )
     }
 }
 export default BossFeat;