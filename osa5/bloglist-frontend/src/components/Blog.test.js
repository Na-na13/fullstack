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

test('show all blog info when button is clicked', async () => {
  const currentUser = {
    token: 'token',
    username: 'username'
  }

  const blog = {
    title: 'Blog about testing code',
    author: 'Master coder',
    url: "blog's url",
    likes: 0,
    user: currentUser
  }

  const mockLike = jest.fn()
  const mockRemove = jest.fn()

  render(<Blog blog={blog} like={mockLike} remove={mockRemove} currentUser={currentUser} />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  expect(await screen.findByText('Master coder', { exact:false })).toBeVisible()
  expect(await screen.findByText("blog's url", { exact:false })).toBeVisible()
  expect(await screen.findByText('0', { exact: false })).toBeVisible()
  expect(await screen.findByText('Added by username', { exact: false })).toBeVisible()
})

test('like button can be clicked', async () => {
  const blog = {
    title: "Blog about testing code",
    author: "Master coder",
    url: "blog's url"
  }

  const currentUser = {
    token: "token",
    username: "username"
  }

  const mockLike = jest.fn()
  const mockRemove = jest.fn()

  render(<Blog blog={blog} like={mockLike} remove={mockRemove} currentUser={currentUser} />)

  const user = userEvent.setup()
  const viewButton = screen.getByText('view')
  await user.click(viewButton)

  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockLike.mock.calls).toHaveLength(2)
})