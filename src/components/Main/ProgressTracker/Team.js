/**
 * Team.js
 * team component, displays a squad of 5
 */
import React from 'react';

const Team = ({ suggested_team }) => {

    return (
        <div className="team-wrapper">
            <table>
                <tbody>
                    <tr>
                        <td>{suggested_team[0]}</td>
                        <td>{suggested_team[1]}</td>
                        <td>{suggested_team[2]}</td>
                        <td>{suggested_team[3]}</td>
                        <td>{suggested_team[4]}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Team;