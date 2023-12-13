import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders blog title', () => {
  const blog = {
    title: "Blog about testing code",
    author: "Master coder",
    url: "blog's url"
  }

  const user = {
    token: "token",
    username: "username"
  }

  const mockLike = jest.fn()
  const mockRemove = jest.fn()

  render(<Blog blog={blog} like={mockLike} remove={mockRemove} currentUser={user} />)

  const element = screen.getByText('Blog about testing code')
  expect(element).toBeDefined()

})