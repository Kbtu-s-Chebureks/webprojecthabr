import {users} from './users';
import {categories} from './category';
export const posts = [
    {
        id: 1,
        title: "How to protect yourself",
        text: "asdfghjkl;sdfghjkfghjvhfvbhbhdbshfsdhgfhsdgfsdhf",
        author: users[0],
        created_at: '2020-01-01',
        category: categories[2]
     },
     {
        id: 2,
        title: "Baisakov's cource for meshoks",
        text: "blablablablablablablablablablablablablablablablablablablablabla",
        author: users[1],
        created_at: '2020-08-01',
        category: categories[1]
     },
     {
        id: 3,
        title: "How to start coding",
        text: "texttexttexttexttexttexttext",
        author: users[1],
        created_at: '2019-02-03',
        categories: categories[1]
     },
     {
        id: 4,
        title: "Data science for lohs",
        text: "blablablablablablablablablablablabla",
        author: users[0],
        created_at: '2020-08-03',
        category: categories[3]
     },
     {
        id: 5,
        title: "Fibonacci numbers in real life",
        text: "1123581321",
        author: users[0],
        created_at: '2019-05-10',
        categories: categories[0]
     },
     {
        id: 6,
        title: "Geometry sucks",
        text: "blablablablablablablablablablablabl",
        author: users[1],
        created_at: '2019-09-02',
        category: categories[0]
     }, 
     {
        id: 7,
        title: "Big data in data science",
        text: "1123581321",
        author: users[1],
        created_at: '2019-06-10',
        categories: categories[3]
     },
     {
        id: 8,
        title: "Quarantine for IT specialists",
        text: "Kotti kysyp uide otyr",
        author: users[1],
        created_at: '2020-02-01',
        category: categories[2]
     }
]