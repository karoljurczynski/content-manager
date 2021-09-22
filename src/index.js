import ReactDOM from 'react-dom';
import { App } from './App';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }
  * {
    box-sizing: border-box;
  }
`;

ReactDOM.render(
  <>
    <App />
    <GlobalStyle />
  </>,
  document.querySelector("#root")
);