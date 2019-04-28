import React from 'react'
import UserDataContext from './UserDataContext'

class UserData extends React.Component {
    state = {
        userID: null,
    }

    render() {
        return (
            <UserDataContext.Provider
                value={
                    {
                        state: this.state,
                        signOutWithFirebase: this.signOutWithFirebase,
                        checkIfActiveHunt: this.checkIfActiveHunt,
                        changeActiveMenu: (activeMenu) => this.changeActiveMenu(activeMenu)
                    }
                }>
                {this.props.children}
            </UserDataContext.Provider>
        )
    }
}

export default UserData