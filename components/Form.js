"use client";
import React from "react";
import styled from "styled-components";
import { signIn } from "next-auth/react";
import config from "../config";

const Form = () => {
  return (
    <StyledWrapper>
      <form className="form">
        <p>
          Welcome,<span>sign in to continue</span>
        </p>
        <button
          className="oauthButton"
          onClick={(event) => {
            event.preventDefault();
            signIn("google", { callbackUrl: config.auth.callbackUrl });
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="35" height="35" viewBox="0 0 100 100">
            <path fill="#f9e65c" d="M84.467,44H50v13h20.856C67.931,65.717,59.702,72,50,72c-12.15,0-22-9.85-22-22s9.85-22,22-22	c4.799,0,9.235,1.541,12.851,4.149l9.269-9.269C66.091,17.956,58.391,15,50,15c-19.33,0-35,15.67-35,35s15.67,35,35,35	s35-15.67,35-35C85,47.952,84.806,45.951,84.467,44z"></path>
            <path fill="#78a2d2" d="M50,57h20.856c-1.577,4.699-4.704,8.679-8.763,11.36l9.87,8.884C79.911,70.828,85,61.01,85,50	c0-2.048-0.194-4.049-0.533-6H50V57z"></path>
            <path fill="#60be92" d="M62.093,68.36C58.622,70.653,54.472,72,50,72c-8.997,0-16.727-5.403-20.137-13.139L18.818,65.89	C24.609,77.23,36.393,85,50,85c8.32,0,15.957-2.908,21.963-7.756L62.093,68.36z"></path>
            <path fill="#f15b6c" d="M29.677,41.569C32.985,33.603,40.837,28,50,28c4.799,0,9.235,1.541,12.851,4.149l9.269-9.269	C66.091,17.956,58.391,15,50,15c-13.772,0-25.681,7.958-31.394,19.524L29.677,41.569z"></path>
          </svg>
          Continue with Google
        </button>
      </form>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .form {
    --background: #d3d3d3;
    --input-focus: #2d8cf0;
    --font-color: #323232;
    --font-color-sub: #666;
    --bg-color: #fff;
    --main-color: #323232;
    padding: 20px;
    background: var(--background);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 20px;
    border-radius: 5px;
    border: 2px solid var(--main-color);
    box-shadow: 4px 4px var(--main-color);
  }

  .form > p {
    font-family: var(--font-DelaGothicOne);
    color: var(--font-color);
    font-weight: 700;
    font-size: 20px;
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
  }

  .form > p > span {
    font-family: var(--font-SpaceMono);
    color: var(--font-color-sub);
    font-weight: 600;
    font-size: 17px;
  }

  .oauthButton {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    width: 250px;
    height: 40px;
    border-radius: 5px;
    border: 2px solid var(--main-color);
    background-color: var(--bg-color);
    box-shadow: 4px 4px var(--main-color);
    font-size: 16px;
    font-weight: 600;
    color: var(--font-color);
    cursor: pointer;
    transition: all 250ms;
    position: relative;
    overflow: hidden;
    z-index: 1;
  }

  .oauthButton::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 0;
    background-color: #212121;
    z-index: -1;
    box-shadow: 4px 8px 19px -3px rgba(0, 0, 0, 0.27);
    transition: all 250ms;
  }

  .oauthButton:hover {
    color: #e8e8e8;
  }

  .oauthButton:hover::before {
    width: 100%;
  }

  .icon {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

export default Form;
