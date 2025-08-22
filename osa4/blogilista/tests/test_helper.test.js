const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    'title': 'Second blog',
    'author': 'Someone else',
    'url': 'No idea either',
    'likes': 0
  },
  {
    'title': 'First blog',
    'author': 'Elsie',
    'url': 'Uri',
    'likes': 7
  },
  {
    'title': 'STILL the first blog',
    'author': 'Meeee',
    'url': 'URLJOKU',
    'likes': 7
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDb,
  usersInDb
}