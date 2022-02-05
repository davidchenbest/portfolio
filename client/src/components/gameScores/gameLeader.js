import React from 'react';

export default function GameLeader({ game, type }) {
    const typeName = type === 'away' ? 'awayLeaders' : 'homeLeaders'
    return <>
        <img src={`https://cdn.nba.com/headshots/nba/latest/260x190/${game.gameLeaders[typeName].personId}.png`} alt={game.gameLeaders[typeName].name} />
        <span className='name'>{game.gameLeaders[typeName].name}</span>
        <div className='stats'>
            <span className='stat'><span>Pts</span> <span>{game.gameLeaders[typeName].points}</span></span>
            <span className='stat'><span>Reb</span> <span>{game.gameLeaders[typeName].rebounds}</span></span>
            <span className='stat'><span>Ast</span> <span>{game.gameLeaders[typeName].assists}</span></span>
        </div>

    </>;
}
