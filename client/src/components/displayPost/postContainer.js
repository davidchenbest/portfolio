import React, { Component } from 'react'
import EachPost from './eachPost'
import fetchGraphQL from '../../modules/fetchGraphQL'
import { postsQuery } from '../../queries/queries'
import secToDate from '../../modules/secToDate'



class PostContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };

    }

    async componentDidMount() {
        const data = (await this.getData()).data.posts
        
        this.setState({ data })
    }

    getData = async () => {
        const query = postsQuery()
        const posts = await fetchGraphQL(query)
        return posts
    }







    render() {
        return (
            <>
                {this.state.data.map((d, index) => (
                    <EachPost key={index} title={d.title} content={d.content} first={d.author.first} last={d.author.last} date={secToDate(d.date)} comments={d.comments}></EachPost>
                ))}
            </>
        );
    }
}

export default PostContainer