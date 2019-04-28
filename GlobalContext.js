import React from 'react';

export const GlobalContext = React.createContext({});

export class GlobalContextProvider extends React.Component {
    state = {
        userID: null,
    }

    _changeUserID = (newID) => {
        this.setState({
            userID: newID,
        })
    }

    render() {
        return (
            <GlobalContext.Provider
                value={{
                    ...this.state,
                    changeUserID: this._changeUserID
                }}
            >
                {this.props.children}
            </GlobalContext.Provider>
        )
    }
}

// create the consumer as higher order component
export const withGlobalContext = ChildComponent => props => (
    <GlobalContext.Consumer>
        {
            context => <ChildComponent {...props} global={context} />
        }
    </GlobalContext.Consumer>
);