import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test("BlogForm's callback function is called with correct props when blog is created", async () => {
  const user = userEvent.setup()
  const mockCreateBlog = jest.fn()

  render(<BlogForm createBlog={mockCreateBlog} />)

  const titleInput = screen.getByPlaceholderText('title of the blog')
  const authorInput = screen.getByPlaceholderText('author of the blog')
  const urlInput = screen.getByPlaceholderText('url of the blog')
  const createButton = screen.getByText('create')

  await user.type(titleInput, 'A blog about testing')
  await user.type(authorInput, 'Master coder')
  await user.type(urlInput, 'url of the blog')
  await user.click(createButton)

  expect(mockCreateBlog.mock.calls).toHaveLength(1)
  expect(mockCreateBlog).toHaveBeenCalledWith({
    title: 'A blog about testing',
    author: 'Master coder',
    url: 'url of the blog'
  })
})