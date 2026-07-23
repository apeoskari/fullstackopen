import { useState, useEffect } from 'react'
import { Routes, Route, Link, Navigate, useMatch } from 'react-router-dom'
import { Container } from '@mui/material'

import Home from './components/Home'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/Login'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({ message: null })

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      setUser(loggedUser)
      blogService.setToken(loggedUser.token)
    }
  }, [])

  const notifyWith = (message, isError = false) => {
    setNotification({ message, isError })
    setTimeout(() => {
      setNotification({ message: null })
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const loggedInUser = await loginService.login({ username, password })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(loggedInUser)
      )
      blogService.setToken(loggedInUser.token)
      setUser(loggedInUser)
      setUsername('')
      setPassword('')
      notifyWith(`Welcome back, ${loggedInUser.name}!`)
    } catch (exception) {
      console.error('Login failed', exception)
      notifyWith('Wrong username or password', true)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    notifyWith('Logged out successfully')
    blogService.setToken(null)
  }

  const addBlog = blogObject => {
    blogService.create(blogObject).then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))
      notifyWith(`a new blog '${returnedBlog.title}' by '${returnedBlog.author}' added`)
    })
  }

  const deleteBlog = async (blogObject) => {
    try {
      await blogService.deleteBlog(blogObject.id)
      setBlogs(blogs => blogs.filter(blog => blog.id !== blogObject.id))
      notifyWith('Blog removed successfully')
    } catch (exception) {
      console.error('Deleting blog failed', exception)
      notifyWith('Deleting blog failed', true)
    }
  }

  const likeBlog = async (blogObject) => {
    try {
      const updatedBlog = await blogService.like(blogObject.id, {
        title: blogObject.title,
        author: blogObject.author,
        url: blogObject.url,
        likes: blogObject.likes + 1
      })
      setBlogs(blogs => blogs.map(blog =>
        blog.id === blogObject.id
          ? { ...updatedBlog, user: blog.user }
          : blog
      ))
    } catch (exception) {
      console.error('Liking blog failed', exception)
      notifyWith('Liking blog failed', true)
    }
  }

  const padding = {
    padding: 5
  }

  const match = useMatch('/blogs/:id')

  const blog = match
    ? blogs.find(blog => blog.id === match.params.id)
    : null

  console.log(blog)

  return (
    <Container>
      <div>
        <Link style={padding} to="/">blogs</Link>
        <Link style={padding} to="/create">new blog</Link>
        {!user && <Link style={padding} to="/login">login</Link>}
        {user && <button onClick={handleLogout}>logout</button>}
      </div>
      <Notification notification={notification} />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              blogs={blogs}
              user={user}
              handleLike={likeBlog}
              handleDelete={deleteBlog}
            />
          }
        />
        <Route
          path="/blogs/:id" element={
            <Blog
              blog={blog}
              user={user}
              handleLike={likeBlog}
              handleDelete={deleteBlog}
            />
          }
        />
        <Route
          path="/create"
          element={<BlogForm createBlog={addBlog}/>}
        />
        <Route
          path="/login"
          element={
            user
              ? <Navigate to="/" replace />
              : <LoginForm
                username={username}
                password={password}
                handleUsernameChange={({ target }) => setUsername(target.value)}
                handlePasswordChange={({ target }) => setPassword(target.value)}
                handleLogin={handleLogin}
              />
          }
        />
      </Routes>
    </Container>
  )
}

export default App