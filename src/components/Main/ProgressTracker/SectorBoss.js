/**
 * SectorBoss.js
 * container for a boss feats and stars to be tracked, similar to Feat.js, but with extra features
 */
import React from 'react';
import BossFeat from "./BossFeat";
import icon_star from '../../../images/icon_star.png';
import icon_star_inactive from '../../../images/icon_star_inactive.png';

const SectorBoss = (props) => {

    //dereference props here, so that we can output the whole props array later
    const { title, progress, sector_id, boss_feats, boss_keycards, boss_team, onBossProgressUpdate } = props;
    //handler for updating boss feats
    const handleFeatUpdate = (update) => {
        update.sector_id = sector_id;
        onBossProgressUpdate(update);
    }

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
        return <BossFeat key={feat.id} complete={complete} boss_feat={feat} progress={progress} boss_keycards={boss_keycards} onFeatUpdate={handleFeatUpdate} />
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
        star_icons.push(<img key={i} src={icon_src} alt={alt} className={icon_class} onClick={() => handleFeatUpdate({ type: "boss_stars", stars: i })} />);
    }

    return (
        <div className="sector-boss-wrapper">
            <div className="hidden"> {JSON.stringify(props)} </div>
            <h2>Boss: {title}</h2>
            <img src={boss_team.icon} alt={boss_team.description + " character icon"} className="boss-icon" />
            <div className="star-selector">
                {star_icons}
            </div>
            {feats}
        </div>

    );
}

export default SectorBoss;