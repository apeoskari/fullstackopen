import { useRef } from 'react'

import Blog from './Blog'
import BlogForm from './BlogForm'
import Togglable from './Togglable'

const Home = ({ blogs, user, createBlog, handleLike, handleDelete }) => {
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
      <div>
        {sortedBlogs.map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
            handleLike={handleLike}
            handleDelete={handleDelete}
          />
        )}
      </div>
    </div>
  )
}

export default Home