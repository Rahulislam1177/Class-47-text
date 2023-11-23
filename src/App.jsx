
import './App.css'
import { getAuth, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import app from './firebase/firebase.init';
import { useState } from 'react';

function App() {
  const [users,setUsers] =useState({})
  console.log(users);
  const auth = getAuth(app);


  const handleSignUp =(event)=>{
    event.preventDefault()
    const from=event.target;
     const email = from.email.value;
     const password = from.password.value;
     console.log(email,password);

     createUserWithEmailAndPassword(auth,email,password)
     .then(result =>{
      const users = result.user;
      setUsers(users)
      console.log(users);
      from.reset();
     })
     .catch((error) => {
     console.log(error);
     
      // ..
    });
  
  }
const handleSignOut =()=>{
  signOut(auth)
  .then(() => {
    setUsers({})
  }).catch((error) => {
  });
  
}

  return (
    <>

        <h2>SignUp</h2>
        {users?.uid && <><h4>{users?.email}</h4> <button onClick={handleSignOut}>SignOut</button></>}
          
      <form onSubmit={handleSignUp}>
        <input type="email" placeholder='Type Your Email' name='email'/> <br />
        <input type="password" placeholder='Type Your password' name='password'/> <br />
        <input type="submit" value="SignUp" />
      </form>
    </>
  )
}

export default App
