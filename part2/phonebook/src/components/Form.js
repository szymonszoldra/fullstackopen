import React from 'react';

export const Form = ({formHandler, nameHandler, nameValue, numberHandler, numberValue}) => (
  <form onSubmit={formHandler}>
    <div>
      name: <input onChange={nameHandler} value={nameValue}/>
    </div>
    <div>
      number: <input onChange={numberHandler} value={numberValue}/>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)