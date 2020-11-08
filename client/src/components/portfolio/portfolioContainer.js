import React from 'react'


const PortfolioContainer = () => {
    const largeImg = (e) => {
        window.open(e.target.src);
    }

    const imgClick = (e) => {
        document.querySelector('.portSection div.port-screen').style.display = 'grid'
    }

    const exitScreen = (e) => {
        e.target.parentNode.style.display = 'none'
    }

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
                <div>
                    <p>Inventory Application</p>
                    <img alt='Broadfeet' onClick={imgClick} src={require('../../images/bf1.JPG')} id='port-img' />
                </div>
                <div className='port-screen first'>
                    <span className='exit-screen' onClick={exitScreen}>X</span>
                    <div className='screen-img-con'>
                        <img alt='Broadfeet' src={require('../../images/bf1.JPG')} id='screen-img' onClick={largeImg} />
                        <img alt='Broadfeet' src={require('../../images/bf2.JPG')} id='screen-img' onClick={largeImg} />
                        <img alt='Broadfeet' src={require('../../images/bf3.JPG')} id='screen-img' onClick={largeImg} />
                    </div>
                    <div>
                        <p>This full stack website, developed entirely by me, was aim as a  automotive inventory system that takes quickbook files and calculates number of products in the inventory for each part number. </p>
                        <p>It supports product search through part number or car's year, make, model, and submodel.</p>
                        <p>With a login feature that enables the system admin to add/remove users as well as assigning different access and roles to each user. </p>
                        <p>There is also product management tabs that allow admin to download report of inventory via CSV. </p>
                        <p>Allows adding/modifying products through part number and  product description such as fitment and dimension.</p>

                    </div>

                </div>

            </div>

            <div className='portSection badge'>
                <div>
                    <span>Javascript</span> <span>Java</span> <span>PHP </span>
                </div>
                <div>
                    <span>ExpressJS</span> <span>ReactJS</span> <span>React Native</span> <span>VueJS</span> <span>JQuery</span>
                </div>
                <div>
                    <span>MySQL</span> <span>MongoDB</span> <span>HTML</span> <span>CSS</span> <span>Git</span>
                </div>
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