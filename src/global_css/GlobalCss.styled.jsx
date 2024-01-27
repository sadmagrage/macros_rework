import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    #root {
      display: flex;
      flex: 1;
      flex-direction: column;
    }
    body {
        height: 100vh;
        display: flex;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        overflow-x: hidden;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
        sans-serif;
    }
`
export default GlobalStyle;