import anecdoteService from '../services/anecdotes';

const types = {
  VOTE: 'VOTE',
  ADD_ANECDOTE: 'ADD_ANECDOTE',
  INIT_ANECTODES: 'INIT_ANECDOTES'
};


// 6.6: anecdotes, step4 ALREADY DONE
export const voteForAnecdote = (anecdote) => {
  return async dispatch => {
    await anecdoteService.vote(anecdote);
    dispatch({
      type: types.VOTE,
      data: anecdote.id
    });
  };
};

export const addAnecdote = (content) => {
  return async dispatch => {
    const anecdote = await anecdoteService.createNew(content);
    dispatch({
      type: types.ADD_ANECDOTE,
      data: anecdote
    });
  };
};

export const initAnecdotes = (anecdotes) => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: types.INIT_ANECTODES,
      data: anecdotes
    });
  };
};

const anecdoteReducer = (state = [], action) => {
  switch(action.type) {
    case types.VOTE: {
      const anecdoteToVote = state.find(a => a.id === action.data);
      const votedAnectode = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1
      };

      return state.map(anecdote => 
        anecdote.id === action.data ? votedAnectode : anecdote
      )
    }
    case types.ADD_ANECDOTE: {
      return [
        ...state,
        action.data
      ];
    }
    case types.INIT_ANECTODES: {
      return action.data;
    }
    default:
      return state;
  }
};

export default anecdoteReducer;