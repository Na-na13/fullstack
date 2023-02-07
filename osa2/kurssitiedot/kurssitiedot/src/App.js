const App = () => {
  const course = {
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
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
      <Total parts={course.parts} />
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

/*const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content part={course.parts} />
      <Total exercises={course.parts} />
    </div>
  )
}

const Header = (props) => {
  return(
    <h1>{props.course}</h1>
  )
}

const Content = (props) => {
  return(
    <div>
      <Part part={props.part[0].name} exercises={props.part[0].exercises} />
      <Part part={props.part[1].name} exercises={props.part[1].exercises} />
      <Part part={props.part[2].name} exercises={props.part[2].exercises} />
    </div>
  )
}

const Total = (props) => {
  return(
    <p>
      Number of exercises {props.exercises[0].exercises + props.exercises[1].exercises + props.exercises[2].exercises}
    </p>
  )
}

const Part = (props) => {
  return(
    <p>
      {props.part} {props.exercises}
    </p>
  )
}

export default App
*/
