import React, { useEffect, useState } from 'react';
import '../../css/nba.css'
import { get } from '../../modules/fetchAPI'
import config from '../../config'
import MoreInfo from './MoreInfo';
const scoreUrl = config.url.nba.scoreUrl
export default function Nba() {
    const [games, setGames] = useState();
    useEffect(() => {
        get(scoreUrl).then(res => { setGames(res.scoreboard.games) })
    }, []);

    return <div className='games'>
        {games && games.map(game =>
            <div className='game' key={game.gameId}>
                <div className='teamCon'>
                    <img src={`https://cdn.nba.com/logos/nba/${game.awayTeam.teamId}/primary/L/logo.svg`} />
                    <div className='teamNameCon'>
                        <span>{game.awayTeam.teamTricode}</span>
                        <span className='record'>{`${game.awayTeam.wins}-${game.awayTeam.losses}`}</span>
                    </div>

                </div>

                <div className='scoreCon'>
                    {game.period !== 0 && <span className='score'>{`${game.awayTeam.score}-${game.homeTeam.score}`}</span>}
                    <span className='gameStatus'>{game.gameStatusText}</span>
                </div>

                <div className='teamCon'>
                    <img src={`https://cdn.nba.com/logos/nba/${game.homeTeam.teamId}/primary/L/logo.svg`} />
                    <div className='teamNameCon'>
                        <span>{game.homeTeam.teamTricode}</span>
                        <span className='record'>{`${game.homeTeam.wins}-${game.homeTeam.losses}`}</span>
                    </div>
                </div>

                <MoreInfo game={game} />
            </div>
        )}

    </div>;
}
