import { useSelector } from 'react-redux'
import Blog from './Blog'

const BlogList = ({ currentUser }) => {
  const blogs = useSelector(state => state.blogs)
  const blogsCopy = [...blogs]

  return (
    <>
      {blogsCopy
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            currentUser={currentUser}
          />
        ))
      }
    </>
  )
}

export default BlogList