import {users} from './users';
import {posts} from './post';

export const likes = [
    {
        post: posts[0],
        WhoLike: [
            users[1],
            users[2],
            users[3]
        ]
     },
    {
        post: posts[3],
        WhoLike: [
            users[0],
            users[3],
        ]
     },

]