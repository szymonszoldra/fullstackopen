import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { voteForAnecdote, initAnecdotes } from '../reducers/anecdoteReducer';
import { displayNotification, hideNotification } from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    return state.anecdotes
                        .filter(anecdote => anecdote.content.includes(state.filter))
                        .sort((a, b) => b.votes - a.votes);
  });
  const dispatch = useDispatch();

  const vote = (anecdote) => {
    dispatch(voteForAnecdote(anecdote));
    dispatch(displayNotification(`VOTED FOR: ${anecdote.content}`));
    setTimeout(() => dispatch(hideNotification()), 5000);
  };

  useEffect(() => {
    dispatch(initAnecdotes())
  }, [dispatch]);

  return ( 
    <section>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </section>
   );
}
 
export default AnecdoteList;