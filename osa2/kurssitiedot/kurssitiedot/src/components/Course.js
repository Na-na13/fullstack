const Course = ({ course }) => {
    return(
      <div>
        <Header text={course.name} />
        <Content content ={course.parts} />
        <Total parts={course.parts} />
      </div>
    )
  }
  
  const Header = ({ text }) => {
    return(
      <h1>{ text }</h1>
    )
  }
  
  const Content = ({ content }) => {
    return(
      <div>
        {content.map(part =>
          <Part key={part.id} name={part.name} exercises={part.exercises} />
        )}
      </div>
    )
  }
  
  const Part = ({ name, exercises }) => {
    return(
      <p>
        {name} {exercises}
      </p>
    )
  }
  
  const Total = ({ parts }) => {
    return(
      <p>
        <strong>total of exercises {parts.reduce((sum, part) => sum + part.exercises, 0)}</strong>
      </p>
    )
  }

export default Course