/**
 * SectorBoss.js
 * container for a boss feats and stars to be tracked, similar to Feat.js, but with extra features
 */
import React, { Component } from 'react';
import BossFeat from "./BossFeat";
import icon_star from '../../../images/icon_star.png';
import icon_star_inactive from '../../../images/icon_star_inactive.png';

class SectorBoss extends Component {

    handleFeatUpdate = (update) => {
        update.sector_id = this.props.sector_id;
        this.props.onBossProgressUpdate(update);
    }

    render() {
        const { progress, sector_id, boss_feats, boss_keycards, boss_team } = this.props;

        //generate all the feats
        const feats = boss_feats.map(feat => {
            let complete = "false";
            //see if that sector is there
            if (progress.boss_progress.filter(s => sector_id === s.sector_id).length > 0) {
                let sector = progress.boss_progress.filter(s => sector_id === s.sector_id)[0];
                //if it is, see if this feat is there
                if (sector.feats.filter(f => f.id === feat.id).length > 0) {
                    //if it is, get its value
                    complete = sector.feats.filter(f => f.id === feat.id)[0].complete;
                }
            }
            return <BossFeat key={feat.id} complete={complete} boss_feat={feat} progress={progress} boss_keycards={boss_keycards} onFeatUpdate={this.handleFeatUpdate} />
        }
        );

        //generate the star icons
        const star_icons = [];
        const stars = progress.boss_progress.filter(s => s.sector_id === sector_id)[0] ? progress.boss_progress.filter(s => s.sector_id === sector_id)[0].stars : 0;
        for (let i = 1; i < 4; i++) {
            let active = i <= stars ? true : false;
            let icon_src = active ? icon_star : icon_star_inactive;
            let alt = active ? "star icon" : "inactive star icon";
            let icon_class = active ? "star" : "star-inactive";
            star_icons.push(<img key={i} src={icon_src} alt={alt} className={icon_class} onClick={() => this.handleFeatUpdate({ type: "boss_stars", stars: i })} />);
        }

        return (
            <div className="sector-boss-wrapper">
                <div className="hidden"> {JSON.stringify(this.props)} </div>
                <h2>Boss: {this.props.title}</h2>
                {JSON.stringify(boss_team)}
                <div className="star-selector">
                    {star_icons}
                </div>
                {feats}
            </div>
        )
    }
}
export default SectorBoss;