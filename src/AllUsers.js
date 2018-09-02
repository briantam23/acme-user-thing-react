import React from 'react';

const AllUsers = ({ users }) => {
    return (
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
    )
}

export default AllUsers