import { createGlobalStyle } from "styled-components";
import background from "../img/background.png"; 

const GlobalStyle = createGlobalStyle`
    *{
        box-sizing: border-box;
        margin: 0;
    }

    body{
        box-sizing: border-box;
        margin: 0;
        background-image: url(${background});
        background-color: #FF851B;
        background-size: contain;
        object-fit: cover;
        background-attachment: fixed;
    }
`;

export default GlobalStyle;