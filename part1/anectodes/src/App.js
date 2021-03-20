import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState({ 0: 0, 1:0, 2:0, 3:0, 4:0, 5:0 });

  const handleVote = (selected) => {
    const copy = { ...votes};
    copy[selected] += 1;
    setVotes(copy);
  }

  const handleNextAnegdote = () => {
    const number = Math.floor(Math.random() * anecdotes.length);
    setSelected(number);
  }

  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <button onClick={() => handleVote(selected)}>vote</button>
      <button onClick={handleNextAnegdote}>next anecdote</button>
    </div>
  )
}

export default App