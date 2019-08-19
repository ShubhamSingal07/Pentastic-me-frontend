import React from 'react';

export const AuthContext = React.createContext();

class AuthContextProvider extends React.Component {
  state = {
    isAuthenticated: false,
  };

  toggleAuth = () => {
    const { isAuthenticated } = this.state;
    this.setState({
      isAuthenticated: !isAuthenticated,
    });
  };

  render() {
    return (
      <AuthContext.Provider value={{ ...this.state, toggleAuth: this.toggleAuth }}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}
