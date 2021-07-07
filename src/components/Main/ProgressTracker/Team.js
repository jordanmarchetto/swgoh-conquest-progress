/**
 * Team.js
 * team component, displays a squad of 5
 */
import React, { Component } from 'react';

class Team extends Component {
    render() {
        const team = this.props.suggested_team;

        return (
            <div className="team-wrapper">
                <table>
                    <tr>
                        <td>{team[0]}</td>
                        <td>{team[1]}</td>
                        <td>{team[2]}</td>
                        <td>{team[3]}</td>
                        <td>{team[4]}</td>
                    </tr>
                </table>
            </div>
        )
    }
}
export default Team;