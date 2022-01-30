import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Scores from './scores'
import Standings from './standings';
import Tabs from './Tabs';
const tabs = [{ route: '/nba', name: 'Scores' }, { route: '/nba/standings', name: 'Standings' }]
export default function Nba({ match }) {
    return <>
        <Tabs tabs={tabs} />
        <Switch>
            <Route path={match.url + '/standings'} component={Standings} />
            <Route path={match.url} component={Scores} />
        </Switch>
    </>
}