import React,{useState,useEffect}from "react";
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Modal from 'react-bootstrap/Modal'
import ListGroup from 'react-bootstrap/ListGroup';  
import "bootstrap/dist/css/bootstrap.min.css";
import './Todo.css'

const Todo = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const handleShow = () => setShow(true);
  
 
    const [data, setData] = useState([]);
    const [newdata,setNewData]=useState("");
    useEffect(()=>{
        fetch('/allpost').then(res=>res.json())
        .then(result=>{
            console.log(result)
            setData(result.posts)
        })
     },[])

    console.log(data)
     const [todo, setTodo] = useState("");
    console.log(todo);
     const addtodos = () =>{
         setData([...data,{TODO:todo,_id:Math.random()}])
         console.log(data)
        // setNewData([...data,todo])
         fetch('/addtodo',{
             method:"post",
             headers:{
                 "content-Type":"application/json"
             },
             body:JSON.stringify({
                 TODO:todo
             })
         }).then(res=>res.json())
         .then(data=>{
             if(data.err){
                 console.log(data.err);
             }
             else{
                 console.log(data.message)
             }
         })
     }

     const deleteTodo = (id) =>{
         console.log(id)
         setData(data.filter((a)=>a._id!==id))
         console.log(data)
        fetch('/deletetodo',{
            method:"delete",
            headers:{
                "content-Type":"application/json"
            },
            body:JSON.stringify({
                id:id
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.err){
                console.log(data.err);
            }
            else{
                console.log(data.message)
            }
        })
         
     }
     
     const updateTodo = (id) =>{
         const found=data.find(a=>a._id===id);
         setData()
         console.log(found)
        fetch('/updatetodo',{
            method:"put",
            headers:{
                "content-Type":"application/json"
            },
            body:JSON.stringify({
                id:id,
                upadate:todo
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.err){
                console.log(data.err);
            }
            else{
                console.log(data.message)
            }
        })
        setShow(false);
     }


  return (
    <div className="card__container">
    <div>
    {
        data.map(item=>{
            return(
      <Card style={{ width: "18rem" }} key={item._id}>
      <div className="formain__container">

        <ListGroup variant="flush">
          <ListGroup.Item>{item.TODO}</ListGroup.Item>
        </ListGroup>
        {/* <img className="img__container" onClick={()=>deleteTodo(item._id)}  
         src="https://www.flaticon.com/svg/vstatic/svg/3096/3096687.svg?token=ex
         p=1617514556~hmac=ba029c3278ed040a7f4257e1cf2e0567" 
         alt=""/> */}
         <img className="img__container" 
         src="https://img.icons8.com/cute-clipart/64/000000/delete-forever.png" 
         onClick={()=>deleteTodo(item._id)}/>
         <img className="img__container" 
         src="https://img.icons8.com/cute-clipart/64/000000/edit.png"
        onClick={()=>{handleShow()}}
         />
         <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Hear You Can Edit Your Todo</Modal.Title>
        </Modal.Header>
        <Form.Group >
          <Form.Control 
          type="text" 
          placeholder="Enter your new thoughts" 
          onChange={(e)=>setTodo(e.target.value)} />
        </Form.Group>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>{updateTodo(item._id)}}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
        </Card>
            )
        })
    }
    </div>
  <Form.Group controlId="formBasicEmail">
    <Form.Control type="email" placeholder="Enter your thoughts" onChange={(e)=>setTodo(e.target.value)} />
  </Form.Group>
        <Button variant="primary" onClick={()=>addtodos()}>
          Add Todo
        </Button>
    </div>
  );
};

export default Todo;
