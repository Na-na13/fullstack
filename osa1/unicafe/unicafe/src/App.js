import { useState } from 'react'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increseGood = () => setGood(good + 1)
  const increseNeutral = () => setNeutral(neutral + 1)
  const increseBad = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={increseGood} text="good" />
      <Button handleClick={increseNeutral} text="neutral" />
      <Button handleClick={increseBad} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

const Statistics = ({good, neutral, bad}) => {
  if(good + bad + neutral === 0){
    return(
      <>
        <h1>statistics</h1>
        <p>
          No feedback given
        </p>
      </>
    )
  }
  return(
    <>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticsLine text="good" numeric={good} />
          <StatisticsLine text="neutral" numeric={neutral} />
          <StatisticsLine text="bad" numeric={bad} />
          <StatisticsLine text="all" numeric={good + bad + neutral} />
          <StatisticsLine text="average" numeric={(good - bad)/(good + neutral + bad)} />
          <StatisticsLine text="positive %" numeric={(good/(good + bad + neutral)*100)} />
        </tbody>
      </table>
    </>
  )
}

const Button = ({handleClick, text}) => {
  return(
    <button onClick={handleClick}>
      {text}
    </button>
  )

}

const StatisticsLine = ({text, numeric}) => {
  return(
    <tr>
      <td>{text}</td>
      <td>{numeric}</td>
    </tr>
  )
}

export default App
