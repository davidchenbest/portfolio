import React from 'react';
import config from '../../config';
const standingKeys = config.nba.standingKeys

export default function Conference({ standings, title, playoffSpots }) {
    return <div className='conferenceCon'>
        <h1>{title}</h1>
        <table>
            <thead>
                <tr>
                    {standingKeys.map(key => <th key={key}>{key.toUpperCase()}</th>)}
                </tr>
            </thead>
            <tbody>
                {standings && standings.map((standing, i) => <tr key={i} className={(i + 1) === playoffSpots ? "playoffCutoff" : null}>
                    {standingKeys.map(key =>
                        <td key={key}>{standing[key]}</td>
                    )}
                </tr>)}
            </tbody>
        </table>
    </div>;
}
