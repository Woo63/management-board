import React from 'react';

const url = process.env.REACT_APP_DB_URL
export default function withDataFetching(WrappedComponent) {
    class WithDataFetching extends React.Component {
        constructor() {
            super();
            this.state = {
                data: [],
                loading: true,
                error: ''
            }
            this.postTicket = this.postTicket.bind(this);
        }
        async componentDidMount() {
            try {
                const res = await fetch(`${url}/tickets.json`);
                const dataJSON = await res.json();
                if (dataJSON) {
                    this.setState({
                        data: Object.values(dataJSON),
                        loading: false
                    });
                }
            } catch(error) {
                this.setState({
                    loading: false,
                    error: error.message,
                });
            }
        }
        async postTicket(ticket, id){
            ticket.id=id+1;
            try {
                const res = await fetch(`${url}/tickets.json`,{method:'POST',body: JSON.stringify(ticket)});
                const dataJSON = await res.json();
                console.log(dataJSON)
                if (dataJSON) {
                    //найти способ рендерить доску
                }
            } catch (e) {
                throw new Error(e.message)
            }

        }
        render() {
            const { data, loading, error } = this.state;
            return (
                <WrappedComponent
                    data={data}
                    loading={loading}
                    error={error}
                    postTicket={this.postTicket}
                    {...this.props}
                />
            );
        }
    }
    WithDataFetching.displayName = `WithDataFetching(${WrappedComponent.name})`;
    return WithDataFetching;
}