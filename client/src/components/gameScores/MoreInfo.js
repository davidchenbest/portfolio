import React from 'react';
import PeriodScores from './periodScores'
import GameLeader from './gameLeader'
import { useState } from 'react';
import '../../css/moreInfo.css'
export default function MoreInfo({ game }) {
    const [show, setShow] = useState(false);
    return <>
        {
            game.period !== 0 && < span className='moreInfoToggle' onClick={(e) => setShow(pre => !pre) || console.log(show) || e.preventDefault()
            }> {show ? '-' : '+'}</span >
        }

        {show && <>
            {game.gameLeaders.awayLeaders.personId !== 0 && <div className='away leader'>
                <GameLeader game={game} type='away' />
            </div>}

            {game.period !== 0 && <div className='periods'>
                <PeriodScores game={game} />
            </div>}

            {game.gameLeaders.homeLeaders.personId !== 0 && <div className='home leader'>
                <GameLeader game={game} type='home' />
            </div>}
        </>}
    </>;
}
