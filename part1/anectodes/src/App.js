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
  const [mostVoted, setMostVoted] = useState(0);

  const checkMostVoted = () => {
    let max = 0;
    let index = 0;

    for (const vote in votes) {
      if( max < votes[vote]) {
        max = votes[vote];
        index = vote;
      }
    }

    if (index !== mostVoted) {
      setMostVoted(index);
    }
  }

  const handleVote = (selected) => {
    const copy = { ...votes};
    copy[selected] += 1;
    setVotes(copy);
  }
  
  const handleNextAnegdote = () => {
    const number = Math.floor(Math.random() * anecdotes.length);
    setSelected(number);
  }
  
  checkMostVoted();
  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <button onClick={() => handleVote(selected)}>vote</button>
      <button onClick={handleNextAnegdote}>next anecdote</button>
      {votes[mostVoted] ? 
        <>
          <h2>Anecdote with most votes</h2>
          <p>{anecdotes[mostVoted]}</p>
          <p>has {votes[mostVoted]} votes</p>
        </> : null
      }
      
    </div>
  )
}

export default App