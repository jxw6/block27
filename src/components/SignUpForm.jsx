import { useState } from 'react'

export default function SignUpForm({token, setToken}) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState(undefined)

    const API = 'https://fsa-jwt-practice.herokuapp.com/'

    const handleSubmit = async (e)=>{
        e.preventDefault()
        console.log("Event Clicked")

        const userLengthError =  () => {
            setErrorMessage('Error: Enter a Username')
        }

        const passLengthError =  () => {
            setErrorMessage('Error: Enter a Password')
        }
        const userLengthError2 =  () => {
            setErrorMessage('Error: Username Too Long')
        }
        
        if (username.length < 1) return userLengthError()
        if (password.length < 1) return passLengthError()
        if (username.length > 8) return userLengthError2()
        
        try {
            let res = await fetch(API + 'signup', {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                username: username,
                password: password,
              }),
            });

            const result = await res.json()
            console.log(result)
            setToken(result.token)
            setErrorMessage("")

        } catch (error) {
            console.error(error)
        }
    }
    return (<h2>Sign Up
        <form onSubmit={handleSubmit}>
                {setErrorMessage && <p>{errorMessage}</p>}
            <label>
                Username: <input value={username} onChange={(e)=>setUsername(e.target.value)}/>
            </label>
            <label>
                Password: <input value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </label>
            <button>
                Submit
            </button>
        </form>
    </h2>)
}