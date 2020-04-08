import { posts } from "./../db/post";
import { users } from "./../db/users";
export const profiles = [
  {
    own_posts: [posts[0], posts[3], posts[4]],
    following: [users[1], users[2], users[3]],
    followers: [users[3], users[2]],
    user: users[0],
    rating: 0,
  },
  {
    own_posts: [posts[1], posts[2], posts[5], posts[6], posts[7]],
    following: [users[0], users[2]],
    followers: [users[0], users[2], users[3]],
    user: users[1],
    rating: 0,
  },
  {
    own_posts: [],
    following: [users[0], users[1], users[3]],
    followers: [users[0], users[1]],
    user: users[2],
    rating: 0,
  },
  {
    own_posts: [],
    following: [users[0], users[1]],
    followers: [users[0], users[2]],
    user: users[3],
    rating: 0,
  },
];
