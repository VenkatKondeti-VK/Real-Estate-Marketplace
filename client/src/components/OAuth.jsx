import React from 'react'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { app } from '../firebase'
import { useDispatch } from 'react-redux'
import { signinSuccess } from '../redux/user/userSlice'
import { useNavigate } from 'react-router-dom'

function OAuth() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleGoogleClick = async () => {
        try{
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app)

            const result = await signInWithPopup(auth, provider)

            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL,
                })
            })
            const data = await res.json()

            dispatch(signinSuccess(data))
            navigate("/")
        }
        catch(err){
            console.log("couldn't sign in with google: ", err)
        }
    }
    
    return (
        <button 
        type='button' 
        className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-80'
        onClick={handleGoogleClick}
        >
            Continue with Google
        </button>
    )
}

export default OAuth
