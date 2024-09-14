"use client";
import styled from "styled-components";

export const StyledHtml = styled.div`
  p {
    margin: 17px 0;
  }

  ul {
    text-align: left;
    margin: 15px 0;
    list-style-type: disc;
    list-style-position: inside;
    li {
      text-indent: 40px;
      margin: 10px 0;
      @media screen and (max-width: 768px) {
        text-indent:0px;
      }
    }
    li::marker {
          color: #ea580c;
        }
  }
  ol {
    margin: 17px 0;
    list-style-type: upper-roman;
    list-style-position: inside;
    font-weight: bold;
    li {
      text-indent: 25px;
      @media screen and (max-width: 768px) {
        text-indent: 0px;
      }
    }
    li::marker {
          color: #ea580c;
        }
  }
  pre {
    font-family: "Fira Code", monospace;
    overflow: scroll;
    padding: 30px 10px;
    color: black;
    background-color: gainsboro;
    border-radius: 5px;
    font-size: 13px;
  }
  pre h1 {
    background-color: red;
  }
  blockquote {
    max-width: 500px;
    width: auto;
    text-align: center;
    margin: 0 auto;
    font-style: italic;
    font-size: 14px;
    padding: 7px 20px;
    border-left: 5px solid #ea580c;
    border-right: 5px solid #ea580c;
    :last-child {
      width: 100%;
      border-bottom: 3px solid #ea580c;
    }
  }

  a {
    text-decoration: underline;
    text-decoration-color: #ea580c;
    text-decoration-thickness:0.1rem;
}
a:hover{
    color: #ea580c;
}
  .ql-video {
    width: 100px;
    height: 100px;
  }

`;
