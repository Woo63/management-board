import React from "react";
import styled from 'styled-components';
import Ticket from "../Ticket/Ticket";

const TableWrapper=styled.div`
    background: linear-gradient(to top left, powderblue, pink);      
    padding-top:15px;
    border-radius: 10px;
    padding:10px;
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    min-height: 50vh;
    width: 20vw;
    
    @media (max-width: 768px) {
        margin-bottom: 5%;
    }
    
`;

const Alert=styled.div`
    text-align: center;
`;

const Table=({loading, error, title, tickets, onDragStart, onDragOver, onDrop, tableId})=>{
    return(
        <TableWrapper
            onDragOver={e => onDragOver(e)}
            onDrop={e => onDrop(e, tableId)}
        >
            <p>{title}</p>
            {(loading || error) && <Alert>{loading ? 'Loading...' : error}</Alert>}
            {tickets.map(item=>(
                <Ticket key={item.id} onDragStart={onDragStart} ticket={item}/>
            ))}
        </TableWrapper>
    )
};

export default Table;

