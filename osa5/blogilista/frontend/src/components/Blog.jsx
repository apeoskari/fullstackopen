import { Link, useNavigate } from 'react-router-dom'
import { Box, Button, Card, CardContent, Stack, Typography } from '@mui/material'

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

  return (
    <div className='blog'>
      <Card>
        <CardContent>
          <Typography variant="h5">
            {blog.title}
          </Typography>
          <Typography sx={{ color: 'text.secondary', fontSize: 18, mb: 1  }}>
            by {blog.author}
          </Typography>
          <Typography component={Link} href={blog.url}>
            {blog.url}
          </Typography>
          <Typography sx={{ color: 'text.secondary', mb: 1 }}>
            Added by {blog.user?.name}
          </Typography>
          <Box sx={{ gap: 1, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Typography>
              {blog.likes} likes
            </Typography>
            {user && <Button className="likes" variant="outlined" onClick={handleLikeClick}>like</Button>}
            {user && blog.user && user.id === blog.user.id && <Button variant="outlined" color="error" onClick={handleDeleteClick}>remove</Button>}
          </Box>
        </CardContent>
      </Card>
    </div>
  )
}

export default Blog