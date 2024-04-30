import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)
  const blogsCopy = [...blogs]

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <>
      {blogsCopy
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <div key={blog.id} style={blogStyle}>
            <Link key={blog.id} to={`blogs/${blog.id}`}>{blog.title}</Link>
          </div>
        ))
      }
    </>
  )
}

export default BlogList
