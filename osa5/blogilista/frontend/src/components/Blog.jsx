import { useParams, useNavigate } from 'react'

const Blog = ({ blog, user, handleLike, handleDelete }) => {
  const id = useParams().id
  const navigate = useNavigate()

  if(!blog) {
    return null
  }

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
    <li className='blog'>
      <div>
        {blog.title} {blog.author}
      </div>
      <div>
        <div>{blog.url}</div>
        <div className='likes'>
          {blog.likes} likes <button onClick={handleLikeClick}>like</button>
        </div>
        <div>{blog.user?.name}</div>
        {user && blog.user && user.id === blog.user.id && (
          <button onClick={handleDeleteClick}>remove</button>
        )}
      </div>
    </li>
  )
}

export default Blog