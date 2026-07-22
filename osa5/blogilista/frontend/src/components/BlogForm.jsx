import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const navigate = useNavigate()

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newBlog,
      author: newAuthor,
      url: newUrl
    })
    setNewBlog('')
    setNewAuthor('')
    setNewUrl('')
  }

  const handleSubmit = () => {
    navigate('/')
  }

  return (
    <div>
      <h2>create new</h2>

      <form onSubmit={addBlog}>
        <div>
          <label>
            title:
            <input
              type="text"
              value={newBlog}
              onChange={event => setNewBlog(event.target.value)}
              placeholder='write title here'
            />
          </label>
        </div>
        <div>
          <label>
            author:
            <input
              type="text"
              value={newAuthor}
              onChange={event => setNewAuthor(event.target.value)}
              placeholder='write author here'
            />
          </label>
        </div>
        <div>
          <label>
            url:
            <input
              type="text"
              value={newUrl}
              onChange={event => setNewUrl(event.target.value)}
              placeholder='write url here'
            />
          </label>
        </div>
        <button type="submit" onClick={handleSubmit}>create</button>
      </form>
    </div>
  )
}

export default BlogForm