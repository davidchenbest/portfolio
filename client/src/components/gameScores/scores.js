import React, { useEffect, useState } from 'react';
import '../../css/nba.css'
import { get } from '../../modules/fetchAPI'
import config from '../../config'
import MoreInfo from './MoreInfo';
import Loading from '../Loading';
import { useRef } from 'react';
const scoreUrl = config.nba.url.scoreUrl

export default function Nba() {
    const [games, setGames] = useState();
    const [loading, setLoading] = useState();
    const [continueRefresh, setContinueRefresh] = useState(false);
    const inverval = useRef();
    useEffect(() => {
        getScores().then(() => {
            if (continueRefresh) { inverval.current = setInterval(() => { getScores() }, 3000); }
        })
        return () => clearInterval(inverval.current)
    }, [continueRefresh]);

    const getScores = async () => {
        try {
            setLoading(true)
            const res = await get(scoreUrl)
            setGames(res.scoreboard.games)
        } catch (error) {

        }
        finally {
            setLoading(false)
        }
    }

    const clickRefresh = () => {
        setContinueRefresh(pre => !pre)
    }

    return <div className='games' >
        <span className='loadingCon'>
            <label>Continue Refresh <input type="checkbox" name='continueRefresh' checked={continueRefresh} onChange={clickRefresh} /></label>
            <i className="material-icons" onClick={getScores}>&#xe8ba;</i>
            {loading && <Loading />}
        </span>
        {
            games && games.map(game =>
                <div className='game' key={game.gameId}>
                    <div className='teamCon'>
                        <img src={`https://cdn.nba.com/logos/nba/${game.awayTeam.teamId}/primary/L/logo.svg`} alt={game.awayTeam.teamTricode} />
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
                        <img src={`https://cdn.nba.com/logos/nba/${game.homeTeam.teamId}/primary/L/logo.svg`} alt={game.homeTeam.teamTricode} />
                        <div className='teamNameCon'>
                            <span>{game.homeTeam.teamTricode}</span>
                            <span className='record'>{`${game.homeTeam.wins}-${game.homeTeam.losses}`}</span>
                        </div>
                    </div>

                    <MoreInfo game={game} />
                </div>
            )
        }

    </div >;
}
