import { useRef } from 'react'

import { Link } from 'react-router-dom'

import Blog from './Blog'
import BlogForm from './BlogForm'
import Togglable from './Togglable'

const Home = ({ blogs, user, createBlog }) => {
  const blogFormRef = useRef()

  const addBlog = (blogObject) => {
    blogFormRef.current?.toggleVisibility()
    createBlog(blogObject)
  }

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <h2>blogs</h2>
      {user && (
        <Togglable buttonLabel="new blog" ref={blogFormRef}>
          <BlogForm createBlog={addBlog} />
        </Togglable>
      )}
      <ul>
        {sortedBlogs.map(blog => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Home