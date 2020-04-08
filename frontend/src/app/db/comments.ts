import {users} from './users';
import {posts} from './post';

export const comments = [
    {
        post: posts[3],
        text: "commnet1",
        whoComment: users[2]
    },
    {
        post: posts[5],
        text: "commnet2",
        whoComment: users[1]
    }
]