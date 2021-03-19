import React, { useState } from 'react'


const Button = ({name, handler}) => (
  <button onClick={handler} >{name}</button>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h2>give feedback</h2>
      <Button name="good" handler={() => setGood(good + 1)}/>
      <Button name="neutral" handler={() => setNeutral(neutral + 1)}/>
      <Button name="bad" handler={() => setBad(bad + 1)}/>

      <h2>statistics</h2>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
    </div>
  )
}

export default App