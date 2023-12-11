import { useState } from "react"

const Blog = ({ blog }) => {
  const [visibility, setVisibility] = useState(false)
  const buttonText = visibility ? "hide" : "view"

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  if (!visibility) {
    return(
      <div style={blogStyle}>
        {blog.title} <button onClick={() => setVisibility(!visibility)}>{buttonText}</button>
      </div>
    )
  } else {
    return(
      <div style={blogStyle}>
        {blog.title} <button onClick={() => setVisibility(!visibility)}>{buttonText}</button> <br/>
        {blog.author}<br/>
        {blog.url}<br/>
        {blog.likes} <button>like</button><br/>
        {blog.user ? `Added by ${blog.user.username}` : ""}
      </div>
    )
  }
}

export default Blog
