import React, { Component } from 'react'
import EachPost from './eachPost'
import fetchGraphQL from '../../modules/fetchGraphQL'
import { postsQuery } from '../../queries/queries'
import secToDate from '../../modules/secToDate'
import { motion } from 'framer-motion'



class PostContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            fetch: false
        };

    }

    async componentDidMount() {
        const data = (await this.getData()).data.posts
        this.setState({ data })
        this.setState({ fetch: true })
    }

    getData = async () => {
        const query = postsQuery()
        const posts = await fetchGraphQL(query)
        return posts
    }







    render() {
        return (
            < div className='postContainer'>

                {this.state.fetch && this.state.data.map((d, index) => (
                    <EachPost key={index} id={d.id} title={d.title} content={d.content} first={d.author.first} last={d.author.last} date={secToDate(d.date)} comments={d.comments}></EachPost>
                ))}

                {!this.state.fetch &&
                    <motion.p
                        animate={{
                            scale: 1.1,
                            transition: {
                                duration: 0.3,
                                yoyo: Infinity
                            }
                        }}
                    >Loading...</motion.p>
                }
            </div>
        );
    }
}

export default PostContainer