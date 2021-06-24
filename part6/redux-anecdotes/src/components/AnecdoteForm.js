import React from 'react';
import { connect } from 'react-redux';
import { addAnecdote } from '../reducers/anecdoteReducer';
import { displayNotification } from '../reducers/notificationReducer';
 
const AnecdoteForm = (props) => {
 
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    props.addAnecdote(content);
    props.displayNotification(`ADDED: ${content}`, 2);
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

const mapDispatchToProps = {
  addAnecdote,
  displayNotification
}

export default connect(null, mapDispatchToProps)(AnecdoteForm);