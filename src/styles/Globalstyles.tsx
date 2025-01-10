import styled from "@emotion/styled";
import { Global, css } from "@emotion/react";

const style = css`
  body {
    padding: 0;
    margin: 0;
    background-color: #ebeef1;
  }

  ul {
    padding: 0 0;
    margin: 0px;
  }
  li {
    list-style: none;
  }
`;

export default function GlobalStyles() {
  return <Global styles={style} />;
}
