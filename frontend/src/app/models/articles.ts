import {User} from './identity';

export interface Category{
    id: number;
    name: string;
}
export interface Post{
    id: number;
    title: string;
    text: string;
    author: User;
    created_at: Date;
    category: Category;
}