import React from 'react';
import { useDispatch } from 'react-redux';
import { addAnecdote } from '../reducers/anecdoteReducer';
import { displayNotification, hideNotification } from '../reducers/notificationReducer';
import anecdotesService from '../services/anecdotes';
 
const AnecdoteForm = () => {
  const dispatch = useDispatch();
 
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    const newAnecdote = await anecdotesService.createNew(content);
    dispatch(addAnecdote(newAnecdote));
 
    dispatch(displayNotification(`ADDED: ${content}`));
    setTimeout(() => dispatch(hideNotification()), 5000);
  };
 
  return ( 
    <section>
       <h2>create new</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <input name="anecdote"/>
          </div>
          <button>create</button>
        </form>
    </section>
  );
};
 
export default AnecdoteForm;