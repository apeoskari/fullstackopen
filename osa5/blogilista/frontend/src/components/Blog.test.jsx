import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import Blog from './Blog'
import { expect } from 'vitest'

const renderBlog = (props) => render(
  <MemoryRouter initialEntries={['/blogs/blog-1']}>
    <Routes>
      <Route path="/blogs/:id" element={<Blog {...props} />} />
    </Routes>
  </MemoryRouter>
)

test('renders blog correctly for a guest', () => {
  const blog = {
    title: 'Some Title',
    author: 'Erkki Erikoinen',
    url: 'URL_1.fi',
    likes: 16,
    user: {
      name: 'Maija Makinen'
    }
  }

  renderBlog({ blog })

  const element = screen.getByText(
    'Erkki Erikoinen: Some Title', { exact: false }
  )
  expect(element).toBeDefined()

  const likeButton = screen.queryByRole('button', { name: 'like' })
  expect(likeButton).not.toBeInTheDocument()

  const urlElement = screen.getByText('URL_1.fi')
  expect(urlElement).toBeDefined()

  const likesElement = screen.getByText('likes 16', { exact: false })
  expect(likesElement).toBeDefined()

  const removeButton = screen.queryByRole('button', { name: 'remove' })
  expect(removeButton).not.toBeInTheDocument()
})

test('renders blog and like button for user who did not create the blog', () => {
  const blog = {
    title: 'Other Title',
    author: 'Erkki Erikoinen',
    url: 'URL_2.fi',
    likes: 18,
    user: {
      id: '123',
      name: 'Maija Makinen'
    }
  }

  const user = { id: '321', name: 'Taija Nykänen' }

  renderBlog({ blog, user })

  const element = screen.getByText(
    'Erkki Erikoinen: Other Title', { exact: false }
  )
  expect(element).toBeDefined()

  const likeButton = screen.queryByRole('button', { name: 'like' })
  expect(likeButton).toBeInTheDocument()

  const urlElement = screen.getByText('URL_2.fi')
  expect(urlElement).toBeDefined()

  const likesElement = screen.getByText('likes 18', { exact: false })
  expect(likesElement).toBeDefined()

  const removeButton = screen.queryByRole('button', { name: 'remove' })
  expect(removeButton).not.toBeInTheDocument()
})

test('renders everything for the creator of the blog', () => {
  const blog = {
    title: 'Third Title',
    author: 'Erkki Erikoisempi',
    url: 'URL_3.fi',
    likes: 7,
    user: {
      id: '123',
      name: 'Maija Makinen'
    }
  }

  const user = { id: '123', name: 'Maija Makinen' }

  renderBlog({ blog, user })

  const element = screen.getByText(
    'Erkki Erikoisempi: Third Title', { exact: false }
  )
  expect(element).toBeDefined()

  const likeButton = screen.queryByRole('button', { name: 'like' })
  expect(likeButton).toBeInTheDocument()

  const urlElement = screen.getByText('URL_3.fi')
  expect(urlElement).toBeDefined()

  const likesElement = screen.getByText('likes 7', { exact: false })
  expect(likesElement).toBeDefined()

  const removeButton = screen.queryByRole('button', { name: 'remove' })
  expect(removeButton).toBeInTheDocument()
})