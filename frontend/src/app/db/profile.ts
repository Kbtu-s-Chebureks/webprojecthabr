import { posts } from "./../db/post";
import { users } from "./../db/users";
export const profiles = [
  {
    image: 'https://vignette.wikia.nocookie.net/naruto/images/d/dd/Naruto_Uzumaki%21%21.png/revision/latest?cb=20170816203155&path-prefix=ru',
    own_posts: [posts[0], posts[3], posts[4]],
    following: [users[1], users[2], users[3]],
    followers: [users[3], users[2]],
    user: users[0],
    rating: 0,
  },
  {
    image: 'https://vignette.wikia.nocookie.net/naruto/images/2/21/Sasuke_Part_1.png/revision/latest?cb=20180722103521&path-prefix=ru',
    own_posts: [posts[1], posts[2], posts[5], posts[6], posts[7]],
    following: [users[0], users[2]],
    followers: [users[0], users[2], users[3]],
    user: users[1],
    rating: 0,
  },
  {
    image:'https://pbs.twimg.com/profile_images/922530905889083396/alDFqgh8_400x400.jpg',
    own_posts: [],
    following: [users[0], users[1], users[3]],
    followers: [users[0], users[1]],
    user: users[2],
    rating: 0,
  },
  {
    image: 'https://www.pngitem.com/pimgs/m/325-3257115_jump-database-imagenes-de-sakura-haruno-hd-png.png',
    own_posts: [],
    following: [users[0], users[1]],
    followers: [users[0], users[2]],
    user: users[3],
    rating: 0,
  },
];
