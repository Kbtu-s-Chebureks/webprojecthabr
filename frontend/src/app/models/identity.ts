import {Post} from './articles';
import {Following, Followers} from './activity';

export interface User {
    id: number;
    username: string;
    password: string;
    name: string;
    birthday: Date;
    email: string;
  }
  
  export interface Profile{
    own_posts: Post[];
    following: Following;
    followers: Followers;
    user: User;
    rating: number;
  }