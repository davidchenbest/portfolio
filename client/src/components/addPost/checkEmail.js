import React, { Component } from 'react';
import { emailQuery, addAuthor } from '../../queries/queries'

class CheckEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthor: true,
            email: '',
            first: '',
            last: '',
            error: ''
        };
    }

    async fetchGraphQL(query) {
        const url = '/graphql'
        const opts = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query })
        };
        const res = await fetch(url, opts)
        const data = await res.json();
        return data
    }

    isEmailRegistered = async (email) => {
        const query = emailQuery(email)
        const data = await this.fetchGraphQL(query)
        return data.data.author
    }

    checkEmail = async (event) => {
        event.preventDefault();
        if (this.state.email) {
            const author = await this.isEmailRegistered(this.state.email)
            if (author.length >= 1) {
                this.props.checkEmail(author[0].id)
            }
            else {
                this.setState({ isAuthor: false })
            }
        }
        if (this.state.first && this.state.last && this.state.email) {
            const query = addAuthor(this.state.email, this.state.first, this.state.last)
            const author = await this.fetchGraphQL(query);
            if (author.errors) {
                let e = ''
                author.errors.forEach(element => {
                    const err = element.message.split(':')
                    e += err[err.length - 1] + '. '

                });
                this.setState({ error: e })
            }
            else {
                this.props.checkEmail(author.data.addAuthor.id)
            }

        }
    }

    goBack = (e) => {
        e.preventDefault()
        this.props.goBack()
    }

    display = () => {
        if (this.state.isAuthor) return (
            <form onSubmit={this.checkEmail}>
                <label>Email</label>
                <input onChange={(e) => this.setState({ email: e.target.value })} required></input>
                <button>Enter Email</button>
                <button onClick={this.goBack}>Back</button>
            </form>
        )
        return (
            <form onSubmit={this.checkEmail}>
                <label>Email</label>
                <input onChange={(e) => this.setState({ email: e.target.value })} required></input>
                <label>First</label>
                <input onChange={(e) => this.setState({ first: e.target.value })} required></input>
                <label>Last</label>
                <input onChange={(e) => this.setState({ last: e.target.value })} required></input>
                <span>{this.state.error}</span>
                <button>Enter Email</button>
                <button onClick={this.goBack}>Back</button>
            </form>
        )
    }

    render() {
        return (
            this.display()
        );
    }
}

export default CheckEmail;