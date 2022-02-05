import React from 'react';

export default function periodScores({ game }) {
    return <>
        {game.awayTeam.periods.map((period, i) => game.period > i && <div className='period' key={i}>
            <span >{period.period}</span>
            <span className='score'>{period.score}</span>
            <span className='score'>{game.homeTeam.periods[i].score}</span>
        </div>)}
    </>
};

