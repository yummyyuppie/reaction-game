import './Form.scss'
import { useState } from 'react'

export default function Form ({ option, signIn, signUp }) {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

	function onSubmitForm(e){
		console.log("here", e)
		e.preventDefault()

		if(option===1){
			signIn(email, password);
			return;
		}
		signUp(email, username, password);
	}


	return (
		<form className='account-form' onSubmit={(evt) => evt.preventDefault()}>
			<div className={'account-form-fields ' + (option === 1 ? 'sign-in' : (option === 2 ? 'sign-up' : 'forgot')) }>
				<input id='email' name='email' type='email' placeholder='E-mail' required  onChange={(e)=>setEmail(e.target.value)}/>
                { option===2 && <input
				onChange={(e)=>setUsername(e.target.value)} 
				id='username' name='username' type='text' placeholder='Username' required={option === 2} disabled={option === 1} />
                }
                <input
				onChange={(e)=>setPassword(e.target.value)} 
				id='password' name='password' type='password' placeholder='Password' required={option === 1 || option === 2}  />
			</div>
			<button className='btn-submit-form' type='submit' onClick={e=>onSubmitForm(e)}>
				{ option === 1 ? 'Sign in' : 'Sign up' }
			</button>
		</form>
	)
}