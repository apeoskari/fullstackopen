import { useState, useEffect } from 'react'

import { Link } from 'react-router-dom'

import Blog from './Blog'
import Notification from './Notification'
import Togglable from './Togglable'
import blogService from '../services/blogs'

const BlogList = ({ blogs }) => {

  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({ message: null })

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappuser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <h1>blogs</h1>
      <Notification message={notification}/>
      <div>
        {sortedBlogs.map(blog =>
          <Blog key={blog.id} blog={blog} user={user} handleLike={() => likeBlog(blog)} handleDelete={() => deleteBlog(blog)} />
        )}
      </div>
    </div>
  )
}

export default BlogList