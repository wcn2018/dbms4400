import React from 'react';
class login extends React.Component {
    constructor () {
      super();
      this.validateUsername = this.validateUsername.bind(this);
      this.validatePassword = this.validatePassword.bind(this);
      this.login = this.login.bind(this);
      this.state = {
        username: 'username',
        password: 'password',
        check_user: {},
        check_pass: {},
        usermatch: false,
        passmatch: false,
        logmatch: false,
        admin: false
      };
    }
  
    updateUsername(event){
      console.log("hey");
      this.setState({username: event.target.value})
    }
  
    updatePassword(event){
      this.setState({password: event.target.value})
    }
  
    //validate Username, fired on every key and if 
    // that key = Enter or Tab, check for existence.
    validateUsername(event){
      this.setState({check_user: undefined});
      if((event.key === "Enter") || (event.key === "")) {
        console.log("triggered");
        let user = this.state.username;
        console.log(user);
        this.setState({check_user:
          fetch(`http://localhost:3000/check_for_value?table=User&column=ID&value='${user}'`, {
            headers : {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
          })
          .then(res => res.json())
          .then(check_user => {
            this.setState({check_user});
            console.log(this.state.check_user);
          })
        })
      } else {
        return false;
      }
    }

    validatePassword(event){
      this.setState({check_pass: undefined});
      if((event.key === "Enter") || (event.key === "")) {
        console.log("triggered");
        let pass = this.state.password;
        console.log(pass);
        this.setState({check_pass:
          fetch(`http://localhost:3000/check_for_value?table=User&column=password&value='${pass}'`, {
            headers : {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
          })
          .then(res => res.json())
          .then(check_pass => {
            this.setState({check_pass});
            console.log(this.state.check_pass);
          })
        })
      } else {
        return false;
      }
    }

    login() {
        let user = this.state.username;
        let pass = this.state.password;
        let temp = {};
        this.setState({logmatch:
            fetch(`http://localhost:3000/login_validate?id='${user}'&pass='${pass}'`, {
                headers : {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json' 
                }
            })
            .then(res => res.json()
            .then(logmatch => {
                this.setState({logmatch});
                console.log(this.state.logmatch);
                temp = this.state.logmatch.data;
                for (let tuple of temp) {
                    if (tuple.ID === user) {
                        if (tuple.AID === user) {
                            console.log("logged in as admin");
                            return;
                        } else {
                            console.log("logged in as user");
                            return;
                        }
                    }
                }
                console.log("bad credentials")
            }))
        })
    }

    render() {
      return (
        <div>
          <h1>LOGIN</h1>
          <div className="App">
            {/* -----------------APP STARTS HERE-------------- */}
            <input type="text" 
              value={this.state.username}
              onChange={this.updateUsername.bind(this)}
              onKeyPress={this.validateUsername}/>
            <input type="text" 
              value={this.state.password}
              onChange={this.updatePassword.bind(this)}
              onKeyPress={this.validatePassword}/>
            <button type="button"
              value="login"
              onClick={this.login.bind(this)}
            >Login</button>  
          </div>
          <h2>no errors</h2>
        </div>
      );
    }
  }
  
export default login;