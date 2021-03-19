import React, { useState } from 'react'


const Button = ({name, handler}) => (
  <button onClick={handler} >{name}</button>
)

const Statistic = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = (props) => {
  const {good, neutral, bad, all, average, positive} = props;

  return (
    <>
      <h2>statistics</h2>
      {all ? 
        <table>
          <tbody>
            <Statistic text="good" value={good}/>
            <Statistic text="neutral" value={neutral}/>
            <Statistic text="bad" value={bad}/>
            <Statistic text="all" value={all}/>
            <Statistic text="average" value={average ? average : 0}/>
            <Statistic text="positive" value={positive ? `${positive}%` : `0%`}/>
          </tbody>
        </table> : <p>No feedback given</p>
      }
      
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + neutral + bad;
  const average = (good - bad) / all;
  const positive = good / all;

  return (
    <div>
      <h2>give feedback</h2>
      <Button name="good" handler={() => setGood(good + 1)}/>
      <Button name="neutral" handler={() => setNeutral(neutral + 1)}/>
      <Button name="bad" handler={() => setBad(bad + 1)}/>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={average}
        positive={positive}
      />
    </div>
  )
}

export default App