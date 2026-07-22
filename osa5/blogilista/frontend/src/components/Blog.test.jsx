import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import Blog from './Blog'

const renderBlog = (props) => render(
  <MemoryRouter initialEntries={['/blogs/blog-1']}>
    <Routes>
      <Route path="/blogs/:id" element={<Blog {...props} />} />
    </Routes>
  </MemoryRouter>
)

test('renders content', () => {
  const blog = {
    title: 'Some Title',
    author: 'Me',
    url: 'URL',
    likes: 0,
    user: {
      name: 'Me'
    }
  }

  renderBlog({ blog })

  const element = screen.getByText(
    'Some Title', { exact: false }
  )
  expect(element).toBeDefined()

  const button = screen.getByRole('button', { name: 'like' })
  expect(button).toBeDisabled()

  const urlElement = screen.getByText('URL')
  expect(urlElement).toBeDefined()

  const likesElement = screen.getByText('likes 0', { exact: false })
  expect(likesElement).toBeDefined()
})

test('renders url and likes when view button is clicked', async () => {
  const blog = {
    title: 'Other Title',
    author: 'You',
    url: 'URL-2.fi',
    likes: 1,
    user: {
      name: 'Me'
    }
  }

  renderBlog({ blog })

  const urlElement = screen.getByText('URL-2.fi')
  expect(urlElement).toBeDefined()

  const likesElement = screen.getByText('likes 1', { exact: false })
  expect(likesElement).toBeDefined()
})

test('clicking the like button twice calls event handler twice', async () => {
  const blog = {
    title: 'Other Title',
    author: 'You',
    url: 'URL-2.fi',
    likes: 1,
    user: {
      name: 'Me'
    }
  }

  const mockHandler = vi.fn()

  renderBlog({ blog, handleLike: mockHandler })

  const user = userEvent.setup()

  const button = screen.getByRole('button', { name: 'like' })
  await user.click(button)
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})

test('calls handleLike with the blog object when a logged in user clicks like', async () => {
  const blog = {
    id: 'blog-1',
    title: 'Other Title',
    author: 'You',
    url: 'URL-2.fi',
    likes: 1,
    user: {
      id: 'user-1',
      name: 'Me'
    }
  }

  const user = { id: 'user-1', name: 'Me' }
  const mockHandler = vi.fn()

  renderBlog({ blog, user, handleLike: mockHandler })

  const userEventInstance = userEvent.setup()
  await userEventInstance.click(screen.getByRole('button', { name: 'like' }))

  expect(mockHandler).toHaveBeenCalledWith(blog)
})

test('disables the like button for guests', () => {
  const blog = {
    id: 'blog-2',
    title: 'Guest Blog',
    author: 'You',
    url: 'URL-3.fi',
    likes: 0,
    user: {
      id: 'user-2',
      name: 'Me'
    }
  }

  renderBlog({ blog, handleLike: vi.fn() })

  expect(screen.getByRole('button', { name: 'like' })).toBeDisabled()
})