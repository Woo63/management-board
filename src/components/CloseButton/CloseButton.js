import React from "react";
import styled from 'styled-components';

const Button=styled.button`
    background:none;
    border:none;
    float:right;
    font-size: 1.2rem;
    line-height: 1;
    margin-bottom:5px;
`;

const CloseButton=({onHandler})=>{
    return(
        <Button
            type="button"
            className="btn btn-light btn-sm"
            onClick={onHandler}
        >
            &times;
        </Button>
    )
}

export default CloseButton;