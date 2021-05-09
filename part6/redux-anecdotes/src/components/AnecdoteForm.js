import React from 'react';
import { useDispatch } from 'react-redux';
import { addAnecdote } from '../reducers/anecdoteReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(addAnecdote(
      event.target.anecdote.value
    ));
    event.target.anecdote.value = '';
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