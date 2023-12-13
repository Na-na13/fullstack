import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('After the blog element is rendered,', () => {
  const mockLike = jest.fn()
  const mockRemove = jest.fn()

  beforeEach(() => {
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

    render(<Blog blog={blog} like={mockLike} remove={mockRemove} currentUser={currentUser} />)
  })

  test('the blog title is shown', () => {
    const element = screen.getByText('Blog about testing code')
    expect(element).toBeInTheDocument()

  })

  test('all the blog info is shown when the "view" button is clicked', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    expect(await screen.findByText('Master coder', { exact:false })).toBeVisible()
    expect(await screen.findByText("blog's url", { exact:false })).toBeVisible()
    expect(await screen.findByText('0', { exact: false })).toBeVisible()
    expect(await screen.findByText('Added by username', { exact: false })).toBeVisible()
  })

  test('the "like" button can be clicked', async () => {
    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockLike.mock.calls).toHaveLength(2)
  })

})
