import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  .error {
    color: red;
    background: lightgrey;
    font-size: 20px;
    border-style: solid;
    border-radius: 5px;
    border-color: red;
    padding: 10px;
    margin-bottom: 10px;
  }

  .positive {
    color: green;
    background: lightgrey;
    font-size: 20px;
    border-style: solid;
    border-radius: 5px;
    border-color: green;
    padding: 10px;
    margin-bottom: 10px;
  }
  
  // masterpiece : )
  button {
    background-color: orange;
    border-color: royalblue;
    border-width: 5px;
    transition: 0.4s;
  }

  button:hover {
    border-color: orange;
    background-color: royalblue;
  }
`;

export default GlobalStyle;