import React from 'react';
import axios from 'axios';
import UserThings from './UserThings';
import AllUsers from './AllUsers';

class App extends React.Component {
    constructor () {
        super ();
        this.state = {
            users: [],
            navBar: 'Only Show Users With Things'
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount () {
        return axios.get('/users')
            .then(res => res.data)
            .then(users => this.setState({ users }));
    }
    handleSubmit (ev) {
        const { navBar } = this.state;
        ev.preventDefault();
        navBar === 'Show All Users'
        ? this.setState({ navBar: 'Only Show Users With Things' })
        : this.setState({ navBar: 'Show All Users' })
    }
    render () {
        const { users, navBar } = this.state;
        const { handleSubmit } = this;
        return (
            <div>
                <h1>Acme Users and Things - React</h1>
                <form onSubmit={ handleSubmit }>
                    <button>{ navBar }</button>
                </form>
                {
                    navBar === 'Only Show Users With Things'
                    ? <AllUsers users={ users } />
                    : <UserThings users={ users } />
                }
            </div>
        )
    }
}

export default App;

