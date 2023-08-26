import React, { useEffect } from "react";
import styled from "styled-components";
import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();

  return (
      <Wrapper className="page-100">
        <section>
          <h1>{error?.response?.status || "404"}</h1>
          <h3>{error?.response?.data || "Sorry, the page you tried cannot be found"}</h3>
          <Link className="btn" to="/">back home</Link>
        </section>
      </Wrapper>
  );
};

const Wrapper = styled.main`
  background: var(--clr-primary-10);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  h1 {
    font-size: 10rem;
  }
  h3 {
    text-transform: none;
    margin-bottom: 2rem;
  }
`;

export default ErrorPage;
