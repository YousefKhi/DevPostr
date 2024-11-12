import React from 'react';
import styled from 'styled-components';

const Input = () => {
  return (
    <StyledWrapper>
      <div className="input-group">
        <input type="email" className="input" id="Email" name="Email" placeholder="uiverse@verse.io" autoComplete="off" />
        <input className="button--submit" defaultValue="Submit" type="submit" />
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .input-group {
    display: flex;
    align-items: center;
  }

  .input {
    min-height: 50px;
    max-width: 150px;
    padding: 0 1rem;
    color: #000000;
    font-size: 15px;
    border: 1px solid #5e4dcd;
    border-radius: 6px 0 0 6px;
    background-color: transparent;
  }

  .button--submit {
    min-height: 50px;
    padding: .5em 1em;
    border: none;
    border-radius: 0 6px 6px 0;
    background-color: #A594F9;
    color: #fff;
    font-size: 15px;
    cursor: pointer;
    transition: background-color .3s ease-in-out;
  }

  .button--submit:hover {
    background-color: #5e5dcd;
  }

  .input:focus, .input:focus-visible {
    border-color: #3898EC;
    outline: none;
  }`;

export default Input;
