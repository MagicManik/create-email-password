import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import './App.css';
import app from "./firebase.init";

const auth = getAuth(app);

function App() {

  // ** 3 validation check করে সেই তথ্য রাখার জন্য
  const [validated, setValidated] = useState(false);

  // * 1 email field এর ভ্যালু রাখার জন্য
  const [email, setEmail] = useState('')

  // * 2 password field এর ভ্যালু রাখার জন্য
  const [password, setPassword] = useState('')


  // regEx error
  const [error, setError] = useState('');

  // checked state
  const [check, setCheck] = useState(false);
  console.log(check)



  // * eventHandler 1. ইভেন্ট হ্যান্ডেলারের ডিফল্ট প্যারামিটারের সাহায্যে ইনপুট এর ভ্যালু বের করা হচ্ছে। 
  const handleEmailBlur = e => {
    setEmail(e.target.value)
  }



  // * eventHandler 2. ইভেন্ট হ্যান্ডেলারের ডিফল্ট প্যারামিটারের সাহায্যে ইনপুট এর ভ্যালু বের করা হচ্ছে। 
  const handlePassawordBlur = event => {
    setPassword(event.target.value)
  }



  // * eventHandler *3
  const createAndVerifyUserHandleSubmite = event => {

    // * বাই ডিফল্ট ফমে কোনো ধরণের বাটন থাকলে সেই বাটনে ক্লিক করলে পেইজ রিলোড হয়। এটাকে আমাদের অনেক সময় থামানোর প্রয়োজন পড়ে। এই ডিফলট বিহেভিয়র থামানোর জন্য আমরা ফমে event.preventDefault() ব্যবহার করি।
    event.preventDefault();


    // ** 3.
    // ভ্যালিডেশন চেক করার জন্য--
    const form = event.target;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      return;
      // যদি ফলস হয় তাহলে এখান থেকে রিটার্ন করে দিবো। গুগলের কাছে আমরা ইনফরমেশন পাঠাবো না।
    }

    if (!/^(?=.*[!@#$&*+ ]).{1,16}$/.test(password)) {
      setError('Password should be at least one special character!')
      return;
    }

    setError('');

    setValidated(true);


    // ইউজার অলরেডি রেজিস্টার হয়ে থালে লগইন হবে।
    if (check) {
      signInWithEmailAndPassword(auth, email, password)
        .then(result => {
          console.log('log in', result.user)
        })
        .catch(error => {
          console.log('log in', error)
        })
    }

    // ইনপুট এর ইনফরমেশন গুগলের কাছে পাঠানো হচ্ছে user তৈরি করার জন্য।
    else {
      createUserWithEmailAndPassword(auth, email, password)
        .then(result => {
          console.log('register', result.user)
          verifyEmail();


          // verification আমরা এখানেও করতে পারি আবার আলাদা ফাংশনেও করতে পারি। নিচে আলাদা ফাংশনে করে দেখানো হলো। তাই এটা কমেন্ট করে রাখলাম।

          // sendEmailVerification(auth.currentUser)


        })
        .catch(error => {
          console.error('register', error)
        })
    }



    // ইভেন্ট.প্রিভেন্টডিফল্টকে সবার নিচে রাখি।
    // event.preventDefault();
    // console.log('submitted', email, password)
  }


  // চেক লিস্ট ইভেন্ট হ্যান্ডেলার
  const handleChecked = event => {
    setCheck(event.target.checked)
  }


  // email varification
  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        console.log('email sent')
      })

  }

  // handle forgotten passwor
  const handleForgottenPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log('sent')
      })
  }


  return (
    <div>
      {/* ** 3. noValidate এবং validated={validated} এর কাজ হলে ইউজারকে নোটিশড করা সঠিক ইমেইল দেও. নিচের noValidate একটা স্পেশান props. যার ভ্যালু সেট করা হয় নাই। ভ্যালু না দিয়ে props পাঠালে তার ভ্যালু true হয়। */}
      <Form noValidate validated={validated} onSubmit={createAndVerifyUserHandleSubmite} className="w-50 mx-auto mt-5">
        <h2 className="text-primary text-center">Please {check ? 'login' : 'register'}</h2>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control onBlur={handleEmailBlur} type="email" placeholder="Enter email" required />


          {/* email ভ্যালিডেশন করার জন্য */}
          <Form.Control.Feedback type="invalid">
            Please provide a valid email.
          </Form.Control.Feedback>


          <Form.Text className="text-muted">
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control onBlur={handlePassawordBlur} type="password" placeholder="Password" required />


          {/* password ভ্যালিডেশন করার জন্য */}
          <Form.Control.Feedback type="invalid">
            Please provide a valid password.
          </Form.Control.Feedback>


        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">

          {/* চেক লিস্টের মধ্যে একটা ইভেন্ট হ্যান্ডেলার এ্যাড করা হয়ছে। */}
          <Form.Check onChange={handleChecked} type="checkbox" label="Already registered?" />
        </Form.Group>
        <p className="text-danger">{error}</p>

        <Button onClick={handleForgottenPassword} variant="link">Link</Button>
        {/* রিসেট পাসওয়ার্ড */}



        <br />
        <br />
        <Button variant="primary" type="submit">
          {check ? 'login' : 'register'}
        </Button>
      </Form>
    </div>
  );
}

export default App;
