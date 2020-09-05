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
        }
        async componentDidMount() {
            try {
                const res = await fetch(`${url}/tickets.json`);
                const dataJSON = await res.json();
                const payload = Object.keys(dataJSON).map(key => {
                    return {
                        ...dataJSON[key],
                        id: key
                    }
                })
                if (dataJSON) {
                    this.setState({
                        data: payload,
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

        render() {
            const { data, loading, error } = this.state;
            return (
                <WrappedComponent
                    data={data}
                    loading={loading}
                    error={error}
                    {...this.props}
                />
            );
        }
    }
    WithDataFetching.displayName = `WithDataFetching(${WrappedComponent.name})`;
    return WithDataFetching;
}