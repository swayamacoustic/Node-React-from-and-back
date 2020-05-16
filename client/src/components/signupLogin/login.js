import React, { Component } from 'react';
import {connect} from 'react-redux';
import {loginUser} from '../../_actions/userAction';
import { Link } from "react-router-dom";

class login extends Component {

    state = {
        username:"",
        password:"",
        errors: []  
    }

    dispalayError = errors => 
        errors.map((error, i ) => <p key={i} >{error}</p>)

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value});
    }

    submitForm = event => {
        event.preventDefault();

        const dataToSubmit = {
            username: this.state.username,
            password: this.state.password
        };

        if(this.isFormvalid(this.state)){
            this.setState({ errors: []})
            this.props.dispatch(loginUser(dataToSubmit))
            .then(response => {
                if(response.payload.loginSuccess) {
                      this.props.history.push('/')
                }else {
                    this.setState({
                        errors: this.state.errors.concat(
                            "faild to login check your email or password"
                        )
                    })
                }

            }).catch(err => {
                this.setState({
                    errors: this.state.errors.concat(
                        "faild to login check your email or password"
                    )
                })
               })

        }  else {
            this.setState({
                errors: this.state.errors.concat(
                    "form is not valid"
                )
            })
        }
        
    }

    isFormvalid = ({ username, password }) => username && password;

    render() {
        return (
            <div>
                <h1>login</h1>
                <form onSubmit={event => this.submitForm(event)}> 
                    <div>
                        <label htmlFor="username">username</label>
                        <input name="username" value={this.state.username} onChange={e => this.handleChange(e)} type="username" />
                    </div>
                    <div>
                        <label htmlFor="password">password</label>
                        <input name="password" value={this.state.password} onChange={e => this.handleChange(e)} type="password"/>
                    </div>

                    {this.state.errors.length > 0 && (
                        <div>
                            {this.dispalayError(this.state.errors)}
                        </div>
                    )}

                    <div>
                        <button type="login" name="action" onClick={this.submitForm}>login</button>
                    </div>
                    <div>
                        <Link to="/signup">
                        <button type="signup" name="action">signup</button>
                        </Link>
                    </div>
                </form>
                
            </div>
        )
    }

}

function mapStateProps(state) {
    return {
        user: state.user
    }
}


export default connect(mapStateProps)(login);