import React from "react";
import styled from 'styled-components';
import Table from "../components/Table/Table";
import withDataFetching from "../withDataFetching";

const BoardWrapper=styled.div`
    display:flex;
    flex-direction:row;
    justify-content: space-between;
    margin:20px 0px 30px;
    flex-wrap:wrap;
    padding:0 15px;
`;

const Board =({tables, loading, error, data})=>(
    // render(){
    //     const { data, loading, error } = this.state;
    //     const tables=[
    //         {id:1,title:'TO DO'},
    //         {id:2,title:'ACTIVE'},
    //         {id:3,title:'REVIEW'},
    //         {id:4,title:'DONE'}
    //     ]
    //     return()

    <BoardWrapper>
        {
            tables.map(item => (
                <Table
                    key={item.id}
                    title={item.title}
                    loading={loading}
                    error={error}
                    tickets={data.filter(ticket => ticket.lane === item.id)}
                />
            ))
        }
    </BoardWrapper>
);

export default withDataFetching(Board);