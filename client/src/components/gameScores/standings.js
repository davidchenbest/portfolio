import React, { useEffect, useState } from 'react';
import config from '../../config';
import { get } from '../../modules/fetchAPI';
import Conference from './Conference';
import Loading from '../Loading'
import "../../css/standings.css"
const standingsUrl = config.nba.url.standingsUrl
const playoffSpots = config.nba.playoffSpots
console.log(playoffSpots);

export default function Standings() {
    const [east, setEast] = useState();
    const [west, setWest] = useState();
    useEffect(() => {
        getStandings()
    }, []);

    const getStandings = async () => {
        const res = await get(standingsUrl)
        setEast(res.standings.east)
        setWest(res.standings.west)
    }

    return <div className='standings'>
        {east ? <>
            <Conference standings={east} title={'East'} playoffSpots={playoffSpots} />
            <Conference standings={west} title={'West'} playoffSpots={playoffSpots} />
        </>
            : <Loading />}
    </div>;
}
