import React from 'react';
class register extends React.Component {
    constructor () {
      super();
      this.state = {
          username: "username",
          password: "password"
      };
    }
  
    updateUsername(event){
      this.setState({username: event.target.value})
    }
  
    updatePassword(event){
      this.setState({password: event.target.value})
    }

    render() {
      return (
        <div>
          <h1>REGISTER</h1>
          <div className="App">
            {/* -----------------APP STARTS HERE-------------- */} 
          </div>
        </div>
      );
    }
  }
  
export default register;