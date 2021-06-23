import React from 'react';
import { useDispatch } from 'react-redux';
import { addAnecdote } from '../reducers/anecdoteReducer';
import { displayNotification } from '../reducers/notificationReducer';
 
const AnecdoteForm = () => {
  const dispatch = useDispatch();
 
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    dispatch(addAnecdote(content));
    dispatch(displayNotification(`ADDED: ${content}`, 2));
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