import {users} from './users';

export const following = [
    {
        own: users[0],
        whoFollowing: [
            users[1],
            users[2],
            users[3]
        ]

    },

    {
        own: users[1],
        whoFollowing: [
            users[0],
            users[2]
        ]
    },
    {
        own: users[2],
        whoFollowing: [
            users[0],
            users[1],
            users[3]
        ]
    },
    {
        own: users[3],
        whoFollowing: [
            users[0],
            users[1]
        ]
    }


]