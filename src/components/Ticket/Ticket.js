import React from "react";
import styled from "styled-components";
import CloseButton from "../CloseButton/CloseButton";


const TicketWrapper=styled.div`
    border-top: 1px solid #9b9d9e;
    padding: 15px;    
    text-align: left;
    &:not(:last-child) {
        margin-bottom: 5%;
        margin-right: ${props => !!props.marginRight ? '1%' : '0'};
    }
`;
const Title=styled.h4`
    text-align: center;    
    padding:2%;
    font-size: 1.2rem;
`;
const Body=styled.p`
    width: 100%;
`;

const Ticket=({ticket, marginRight, onDragStart, onRemove})=>{
    return (

        <TicketWrapper
            draggable={true}
            onDragStart={e => onDragStart && onDragStart(e, ticket.id)}
            marginRight={marginRight}
        >
            <CloseButton onHandler={()=>onRemove(ticket.id)}/>
            <Title>{ticket.title}</Title>
            <Body>{ticket.body}</Body>
        </TicketWrapper>
    )
}

export default Ticket;