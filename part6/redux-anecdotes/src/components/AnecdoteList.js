import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { voteForAnecdote } from '../reducers/anecdoteReducer';
import { displayNotification, hideNotification } from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes.sort((a, b) => b.votes - a.votes));
  const dispatch = useDispatch();

  const vote = ({id, content}) => {
    dispatch(voteForAnecdote(id));
    dispatch(displayNotification(`VOTED FOR: ${content}`));
    setTimeout(() => dispatch(hideNotification()), 5000);
  };

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