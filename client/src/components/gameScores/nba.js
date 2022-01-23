import React, { useEffect, useState } from 'react';
import '../../css/nba.css'
import { get } from '../../modules/fetchAPI'
import config from '../../config'
const scoreUrl = config.url.nba.scoreUrl
export default function Nba() {
    const [games, setGames] = useState();
    useEffect(() => {
        get(scoreUrl).then(res => { setGames(res.scoreboard.games) })
    }, []);

    return <div>
        {games && games.map(game =>
            <div className='game'>
                {game.period != 0 && <span>LIVE</span>}
                <img src={`https://cdn.nba.com/logos/nba/${game.homeTeam.teamId}/primary/L/logo.svg`} />
                {game.homeTeam.teamTricode}
                {game.homeTeam.score}
                <img src={`https://cdn.nba.com/logos/nba/${game.awayTeam.teamId}/primary/L/logo.svg`} />
                {game.awayTeam.teamTricode}
                {game.awayTeam.score}
            </div>
        )}

    </div>;
}
