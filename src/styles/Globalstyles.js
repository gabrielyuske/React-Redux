import styled, { createGlobalStyle } from "styled-components"
import { primaryColor, primaryDark } from "../config/colors";


export default createGlobalStyle`
*{
  margin:0;
  padding: 0;
  outline: none;
  box-sizing: border-box;
}

body{
  font-family: sans-serif;
  background: ${primaryDark};
  color: ${primaryDark};
}

html,body, #root{
  height: 100%;
}

button {
  cursor: pointer;
  background: ${primaryColor};
  border: none;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  font-weight: 800;
}

a{
  text-decoration: none;
  color: ${primaryColor};
}

ul{
list-style: none;
}

`;

export const Container = styled.section`
  max-width: 600px;
  background: #fff;
  margin: 30px auto;
  padding: 30px;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);

`;
