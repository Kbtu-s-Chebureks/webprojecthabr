import {User} from './identity';
import {Post} from './articles';

export interface Likes{
    post: Post;
    whoLike: User;
}

export interface Comments{
    post: Post;
    text: string,
    whoComment: User;
}

export interface Following{
    own: User
    whoFollowing: User[];
}

export interface Followers{
    own: User;
    WhoFollow: User[];
}