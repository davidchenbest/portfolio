import React from 'react'
import fetchGraphQL from '../../modules/fetchGraphQL'

import LandingContent from './LandingContent'
import Projects from './Projects'
import OtherProjects from './OtherProjects'
import MoreAbout from './MoreAbout'
import Badge from './Badge'

const PortfolioContainer = () => {
    fetchGraphQL('{post{title}}').then(data => { data = '' }) // faster blog fetch: herokuapp sleeps after 30 min
    return (
        <div className='portfolioContainer'>
            <LandingContent></LandingContent>
            <Projects></Projects>
            <div className='grid-con'>
                <div className='grid'>
                    <OtherProjects></OtherProjects>
                    <Badge></Badge>
                    <MoreAbout></MoreAbout>
                </div>
            </div>
        </div>
    )
}

export default PortfolioContainer