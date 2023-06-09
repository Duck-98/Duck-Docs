import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
    ${reset};
    html,
      body {
        margin: 0;
        padding: 0;
        overflow: initial !important;
        background-color: #F3F3F3;
      }
   
      *, *::before, * ::after {
        box-sizing: border-box;
      }
      
  .board {
    background-color: white;
  }
  
  .ql-editor {
    width: 8.5in;
    min-height: 7in;
    padding: 1in;
    margin: 1rem;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.5);
    background-color: white;
  }

  .ql-snow {
    border: none;
    display: flex;
    justify-content: center;
  }

  .ql-toolbar.ql-snow {
    display: flex;
    justify-content: center;
    position: sticky;
    top: 0;
    z-index: 1;
    background-color: #f3f3f3;
    border: none;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.5);
  }
  @page {
    margin: 1in;
    }

  @media print {
    body {
      background: none;
    }

  .ql-editor {
    width: 6.5in;
    height: 7in;
    padding: 0;
    margin: 0;
    box-shadow: none;
    align-self: flex-start;
  }

  .ql-toolbar .ql-snow {
    display: none;
  }
}
`;

export default GlobalStyle;
