import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
 

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    :focus {
        background-color: rgb(224,224,224,0.5); 
    }

    body {
        -webkit-font-smoothing: antialiased;

    }

    border-style, input-security, textarea {
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
        font-size: 1rem;
    }

    button {
        background-color: red;
    }
  

    h1, h2, h3 {
        color: ${(props) => props.theme["gray-600"]};
    }

    h6 {
        font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
        font-weight: 500;
        font-size: 1.2rem;
        color: grey;
    }
`;
