import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

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

  render(<Blog blog={blog} />)

  const element = screen.getByText(
    'Some Title', { exact: false }
  )
  expect(element).toBeDefined()

  const button = screen.getByText('view')
  expect(button).toBeDefined()

  screen.debug()

  const urlElement = screen.getByText('URL')
  expect(urlElement).not.toBeVisible()

  const likesElement = screen.getByText('0 likes')
  expect(likesElement).not.toBeVisible()
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

  render(<Blog blog={blog} />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const urlElement = screen.getByText('URL-2.fi')
  expect(urlElement).toBeDefined()

  const likesElement = screen.getByText('1 likes', { exact: false })
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

  render(<Blog blog={blog} handleLike={mockHandler} />)

  const user = userEvent.setup()
  // open the details to reveal the like button
  const viewButton = screen.getByText('view')
  await user.click(viewButton)

  const button = screen.getByText('like')
  await user.click(button)
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})