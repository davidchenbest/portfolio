import React from 'react'


const PortfolioContainer = () => {



    return (
        <div id='portfolioContainer'>
            <div className='landing-content'>
                <img alt='Profile' src={require('../../images/pfp.jpg')} id='pfp' />
                <h1 id="name" >Jia Chen</h1>
                <span className='description '>Continuous Learning</span>
                <p>Computer Science engineer interested in pursuing software development <br /> with vision to create interactive and functional applications. </p>
            </div>



            <div className='portSection'>
                <h3 className='title'>Portfolio</h3>

            </div>

            <div className='portSection'>
                <span>Javascript, Java, PHP </span>
                <span>ExpressJS, ReactJS, React Native, VueJS, JQuery</span>
                <span>MongoDB, MySQL, HTML, CSS, Git Hub</span>
            </div>

            <div className='portSection'>
                <h3 className='title'>More About Me</h3>
                <p>I am a Web Developer in New York City. I build, extend, and maintain websites using various technologies I have learned overtime.</p>
                <p>I enjoy gaining knowledge through other people and online, mainly through videos or posts/blogs.</p>
                <p>When I am not programming, I am a big sports fan and outdoor person. I enjoy performing and watching various types of sports, mainly basketball.</p>
                <a href='/blog'>Even more: my blog</a>
            </div>

        </div>
    )

}

export default PortfolioContainer