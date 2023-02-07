const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      {courses.map(course =>
        <div key={course.id}>
          <Course course={course} />
          <Total parts={course.parts} />
        </div>
      )}
    </div>
  )
}

const Course = ({ course }) => {
  return(
    <div>
      <Header text={course.name} />
      <Content content ={course.parts}/>
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

export default App
