import React from 'react';
import axios from 'axios';
import UserThings from './UserThings';

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
        const { users, navBar } = this.state;
        //const _users = users.filter(user => user.userThings);
        console.log('hi', users)
        ev.preventDefault()
        navBar === 'Show All Users'
        ? (this.setState({ users: [], navBar: 'Only Show Users With Things' })
        )
        : this.setState({ /*users,*/ navBar: 'Show All Users' });
    }
    render () {
        const { users, navBar } = this.state;
        const { handleSubmit } = this;
        console.log(users)
        return (
            <div>
                <h1>Acme Users and Things - React</h1>
                <form onSubmit={ handleSubmit }>
                    <button>{ navBar }</button>
                </form>
                <ul>
                    {   
                        users.map(user => user.userThings 
                            ?(<li key={ user.id }>
                                { user.name}
                                <ul>
                                    { 
                                        user.userThings.map(userThing => <li key={ userThing.id }>
                                            { userThing.thing.name }
                                        </li>)
                                    }
                                </ul>
                            </li>)
                            : null
                        )
                    }
                </ul>
            </div>
        )
    }
}

export default App;

