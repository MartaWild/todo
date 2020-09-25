import { createGlobalStyle } from "styled-components";
import Background from "../bg32.jpg";

export const GlobalStyle = createGlobalStyle`
  body {
    background-image: url(${Background});
    background-size: cover;
    
    @media only screen and (max-width: 1250px) {
        min-height: 100vh
    }      
  }
`;