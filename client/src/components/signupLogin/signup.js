import React, { Component } from 'react';
import {connect} from 'react-redux';
import {signupUser} from '../../_actions/userAction';

class signup extends Component {

     state = {
        firstname:"",
        lastname:"",
        username:"",
        password:"",
        passwordConfirmaion:"",
        errors: []  
    }

    dispalayError = errors => 
    errors.map((error, i ) => <p key={i} >{error}</p>)


    handleChange = event => {
        this.setState({[event.target.name]: event.target.value});
    }

    isFormvalid = () => {
        let errors = [];
        let error;

        if(this.isFormempty(this.state)) {
            error = {message: "fill all the fields"};
            this.setState({ errors : errors.concat(error)});

        } else if(!this.isPasswordvalid(this.state)){
            error = {message: "password invalid"};
            this.setState({ errors : errors.concat(error)});          
        }else{
            return true;
        }
    }

    isPasswordvalid = ({password, passwordConfirmaion}) => {
        if(password.length < 6 || passwordConfirmaion.length < 6){
            return false;
        }else if(password !== passwordConfirmaion){
            return false;
        }else {
            return true;
        }
    }

    isFormempty = ({firstname, lastname, username, password, passwordConfirmaion}) => {
        return (
            !firstname.length ||
            !lastname.length ||
            !username.length ||
            !password.length ||
            !passwordConfirmaion.length
        )

    }

    submitForm = event => {
        event.preventDefault();

        const dataToSubmit = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            username: this.state.username,
            password: this.state.password,
            passwordConfirmaion: this.state.passwordConfirmaion
        };        

        if(this.isFormvalid()){
           this.setState({ errors : []})
           this.props.dispatch(signupUser(dataToSubmit))
           .then(response => {
               
               if(response.payload.success){
                this.props.history.push('/login')

               }else{
                this.setState({
                    errors: this.state.errors.concat(
                        "your attempt to send data to server failed"
                    )
                })

               } 
           })
           .catch(err => {
            this.setState({
                errors: this.state.errors.concat(err)
            })
           })
        }else{
            console.error("form is not valid");
        }

    }
        


    render() {
        return (
            <div>
                <h1>signup</h1>
                <form onSubmit={event => this.submitForm(event)}> 
                <div>
                        <label htmlFor="firstname">firstname</label>
                        <input name="firstname" value={this.state.firstname} onChange={e => this.handleChange(e)} type="text" />
                    </div>
                    <div>
                        <label htmlFor="lastname">lastname</label>
                        <input name="lastname" value={this.state.lastname} onChange={e => this.handleChange(e)} type="text" />
                    </div>
                    <div>
                        <label htmlFor="username">username</label>
                        <input name="username" value={this.state.username} onChange={e => this.handleChange(e)} type="email" />
                    </div>
                    <div>
                        <label htmlFor="password">password</label>
                        <input name="password" value={this.state.password} onChange={e => this.handleChange(e)} type="password"/>
                    </div>
                    <div>
                        <label htmlFor="passwordConfirmaion">passwordConfirmaion</label>
                        <input name="passwordConfirmaion" value={this.state.passwordConfirmaion} onChange={e => this.handleChange(e)} type="password"/>
                    </div>

                    {this.state.errors.length > 0 && (
                        <div>
                            {this.dispalayError(this.state.errors)}
                        </div>
                    )}

                    <div>
                        <button type="signup" name="action" onClick={this.submitForm}>signup</button>
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


export default connect(mapStateProps)(signup);