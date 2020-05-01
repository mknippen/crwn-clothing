import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

import './sign-up.styles.scss';

class SignUp extends React.Component {
    constructor() {
        super()

        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    handleSumbit = async event => {
        event.preventDefault();

        const {displayName, email, password, confirmPassword} = this.state;

        if (password !== confirmPassword) {
            alert("Paswords don't match");
            return;
        }

        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password);
            await createUserProfileDocument(user, {displayName});

            this.setState({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
            });
        } catch (error) {

        }
    }

    handleChange = event => {
        const { value, name } = event.target
        this.setState({[name]: value })
    }

    render() {
        const {displayName, email, password, confirmPassword} = this.state;
        return (
            <div className='sign-up'>
                <h2>I do not have an account</h2>
                <span>Sign up with your email and password</span>

                <form className='sign-up-form' onSubmit={this.handleSumbit}>
                    <FormInput name='displayName' type='text' value={displayName} handleChange={this.handleChange} label='Display Name' required />
                    <FormInput name='email' type='email' value={email} handleChange={this.handleChange} label='Email' required />
                    <FormInput name='password' type='password' value={password} onChange={this.handleChange} label='Password' required />
                    <FormInput name='confirmPassword' type='password' value={confirmPassword} onChange={this.handleChange} label='Confim Password' required />

                    <CustomButton type='submit'>SIGN UP</CustomButton>
                </form>
            </div>
        )
    }
}

export default SignUp;