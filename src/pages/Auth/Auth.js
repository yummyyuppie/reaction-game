import { useState } from "react"
import './Auth.scss'
import Form from "components/Form/Form";
import {  createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile  } from 'firebase/auth';
import { auth, db } from 'firebase.js';
import { collection, addDoc } from "firebase/firestore";
import { json, useNavigate } from 'react-router-dom'
import {setUser} from 'store/slices/userSlice';
import {useDispatch} from 'react-redux';

export default function Auth () {
    const navigate = useNavigate();
    const dispatch = useDispatch();

	const [option, setOption] = useState(1);

    function signIn(email, password){
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            dispatch(setUser({
                email: user.email,
                id: user.uid,
                token: user.accessToken,
                displayName: user.displayName
            }))
            navigate("/")
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorCode + ": " + errorMessage)
        });
    }

    async function signUp(email, username, password){
        await createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            const user = userCredential.user;
            await updateProfile(user, {displayName: username})
            try {
                const docRef = await addDoc(collection(db, "user_results"), {
                  user: user.uid,
                  username: username,
                  maxScore: -1    
                });
                console.log("Document written with ID: ", docRef.id);
              } catch (e) {
                console.error("Error adding document: ", e);
              }
              finally{
                setOption(1);
              }
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorCode + ": " + errorMessage)
        })
    }
	
	return (
        <div className="auth">
            <div className='container'>
                <header>
                    <div className={'header-headings ' + (option === 1 ? 'sign-in' : 'sign-up'  ) }>
                        <span>Sign in to your account</span>
                        <span>Create an account</span>
                    </div>
                </header>
                <ul className='options'>
                    <li className={option === 1 ? 'active' : ''} onClick={() => setOption(1)}>Sign in</li>
                    <li className={option === 2 ? 'active' : ''} onClick={() => setOption(2)}>Sign up</li>
                </ul>
                <Form option={option} 
                    signIn={signIn}
                    signUp={signUp}
                />
            </div>
        </div>
	)
}