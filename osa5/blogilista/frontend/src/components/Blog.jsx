import { useNavigate } from 'react-router-dom'

const Blog = ({ blog, user, handleLike, handleDelete }) => {
  const navigate = useNavigate()

  if(!blog) {
    return null
  }

  const handleDeleteClick = () => {
    if (handleDelete && window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      handleDelete(blog)
      navigate('/')
    }
  }

  const handleLikeClick = () => {
    if (user && handleLike) {
      handleLike(blog)
    }
  }

  /*
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  */

  return (
    <li className='blog'>
      <h2>
        {blog.author}: {blog.title}
      </h2>
      <div>
        <a href={blog.url}>{blog.url}</a>
        <div className='likes'>
          likes {blog.likes}
          {user && (
            <button onClick={handleLikeClick}>like</button>
          )}
        </div>
        <div>Added by {blog.user?.name}</div>
        {user && blog.user && user.id === blog.user.id && (
          <button onClick={handleDeleteClick}>remove</button>
        )}
      </div>
    </li>
  )
}

export default Blog