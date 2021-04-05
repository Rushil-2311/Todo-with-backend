import React,{useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'

import {Link,useHistory} from 'react-router-dom'
import './Signup.css';

const Signup = () => {
    const history = useHistory()
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const uploadData=()=>{
        fetch("/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                password,
                email,
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.err){
              console.log(data.err)
            }
            else{
                console.log(data.message);
                history.push('/Todo')
            }
         }).catch(err=>{
             console.log(err)
         })
    }

  return (
    <div className="signup__container">
      <Form>
      <Form.Group >
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter your Name" onChange={(e)=>{setName(e.target.value)}}/>
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={(e)=>{setEmail(e.target.value)}}/>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}}/>
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary"  onClick={uploadData}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Signup;
