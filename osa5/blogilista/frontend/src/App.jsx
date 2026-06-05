import { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({ message: null })

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = blogObject => {
    blogFormRef.current.toggleVisibility()
    blogService.create(blogObject).then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))
    })
  }

  const deleteBlog = async blogObject => {
    if (window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}?`)) {
      try {
        await blogService.deleteBlog(blogObject.id)
        setBlogs(blogs.filter(blog => blog.id !== blogObject.id))
        notifyWith('Blog removed successfully')
      } catch (exception) {
        console.error('Deleting blog failed', exception)
        notifyWith('Deleting blog failed', true)
      }
    }
  }

  const likeBlog = async blogObject => {
    try {
      const updatedBlog = await blogService.like(blogObject.id, {
        title: blogObject.title,
        author: blogObject.author,
        url: blogObject.url,
        likes: blogObject.likes + 1
      })
      setBlogs(blogs.map(blog =>
        blog.id === blogObject.id
          ? { ...updatedBlog, user: blog.user }
          : blog
      ))
    } catch (exception) {
      console.error('Liking blog failed', exception)
      notifyWith('Liking blog failed', true)
    }
  }

  const notifyWith = (message, isError = false) => {
    setNotification({ message, isError })
    setTimeout(() => {
      setNotification({ message: null })
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      notifyWith(`Welcome back, ${user.name}!`)
    } catch (exception) {
      console.error('Login failed', exception)
      notifyWith('Wrong username or password', true)
    }
  }

  const loginForm = () => (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>
            username
            <input
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            password
            <input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )

  const blogList = () => {
    const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

    return (
      <div>
        {sortedBlogs.map(blog =>
          <Blog key={blog.id} blog={blog} user={user} handleLike={() => likeBlog(blog)} handleDelete={() => deleteBlog(blog)} />
        )}
      </div>
    )
  }

  const logoutButton = () => (
    <button onClick={() => {
      window.localStorage.removeItem('loggedBlogappUser')
      setUser(null)
      notifyWith('Logged out successfully')
      blogService.setToken(null)
    }}>
      logout
    </button>
  )

  return (
    <div>
      <Notification notification={notification} />
      {!user && loginForm()}
      {user && (
        <div>
          <h2>blogs</h2>
          <p>{user.name} logged in {logoutButton()}</p>
          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>
          {blogList()}
        </div>
      )}
    </div>
  )
}

export default App