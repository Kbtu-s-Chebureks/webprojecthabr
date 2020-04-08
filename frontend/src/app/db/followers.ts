import {users} from './users';
export const followers = [
    {
        own: users[0],
        WhoFollow: [
            users[3], 
            users[2] 
        ]
    },
    {
        own: users[1],
        WhoFollow: [
            users[0],
            users[2],
            users[3]
        ]
    },
    {
        own: users[2],
        WhoFollow: [
            users[0],
            users[1],
        ]
    },
    {
       own: users[3],
       WhoFollow: [
           users[0],
           users[2],
       ]
    }
]