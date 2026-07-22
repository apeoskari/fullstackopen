import { useState } from 'react'

const Blog = ({ blog, user, handleLike, handleDelete }) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }

  const handleDeleteClick = () => {
    if (handleDelete && window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      handleDelete(blog)
    }
  }

  const handleLikeClick = () => {
    if (handleLike) {
      handleLike(blog)
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div className='blog' style={blogStyle}>
      <div>
        {blog.title} {blog.author} <button onClick={() => setVisible(!visible)}>{visible ? 'hide' : 'view'}</button>
      </div>
      <div style={showWhenVisible}>
        <div>{blog.url}</div>
        <div className='likes'>
          {blog.likes} likes <button onClick={handleLikeClick}>like</button>
        </div>
        <div>{blog.user?.name}</div>
        {user && blog.user && user.id === blog.user.id && (
          <button onClick={handleDeleteClick}>remove</button>
        )}
      </div>
    </div>
  )
}

export default Blog