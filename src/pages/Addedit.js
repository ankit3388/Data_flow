import React ,{useState,useEffect} from 'react'
import { useNavigate,useParams } from "react-router-dom";
import "./Addedit.css";
import fireDb from "../firebase";
import {toast} from "react-toastify";

const initialState ={
    name:"",
    email:"",
    contact:"",
    status:"",

};
function Addedit() {
    const [state,setState]=useState(initialState);
    const [data,setData]=useState({});

    const handleInputChange=(event)=>{
        const{name,value}= event.target;
        setState({...state,[name]:value});
    };
    const {name,email,contact,status}=state;

    const history=useNavigate();
    let {postId}=useParams();
    console.log(postId);

    useEffect(() =>{
        fireDb.child("contact").on("value",(snapshot)=>{
            if(snapshot.val()!== null)
            {
                setData({...snapshot.val()});
            }
            else
            {
                setData({});
            }
        });

        return ()=>{
            setData({});
        };

    },[postId]);
    useEffect (()=>
    {
        if(postId){
            setState({...data[postId]})
        }
        else
        {
            setState({...initialState});
        }
        return () => {
            setState({...initialState});
        };
    } ,[postId,data])
    const handleSubmit = (event) => {
        event.preventDefault();
        if(!name || !email || !contact || !status)
        {
            toast.error("Please Provide value in each input")
            console.log("hi from error");
            alert("ye fill kar");
        }
        else
        {
            if(!postId)
            {
                fireDb.child("contact").push(state,(err)=>
                {

                    if(err)
                    {
                        toast.error(err);
                    }
                    else
                    {
                        toast.success("contact Added Successfully");
                    };
                });
            }
            else
            { fireDb.child(`contact/${postId}`).push(state,(err) => {
                if(err)
                {
                    toast.error(err);

                }
                else
                {
                    toast.success("Contact Updated SucessFully");
                }

            });
        }
            setTimeout (()=> history("/"));
        }
    };
  return (
    <div style={{ marginTop:"100px"}}>
        <form style={{
            margin:"auto",
            padding:"15px",
            maxwidth:"400px",
            alignContent:"center",

        }}
        onSubmit={handleSubmit}>
        <lable htmlFor="email">Email</lable>
        <input type="email"
        id="email"
        name="email"
        placeHolder="ankit@gmail.com"
        value={email || ""}
        onChange={handleInputChange}/>
         <lable htmlFor="name">Name</lable>
        <input type="text"
        id="name"
        name="name"
        placeHolder="Yourname..."
        value={name || ""}
        onChange={handleInputChange}/>
         <lable htmlFor="contact">contact</lable>
        <input type="number"
        id="contact"
        name="contact"
        placeHolder="Your Contact No..."
        value={contact || ""}
        onChange={handleInputChange}/>
        <lable htmlFor="name">Status</lable>
        <input type="text"
        id="status"
        name="status"
        placeHolder="YourStatus..."
        value={status || ""}
        onChange={handleInputChange}/>
         <input type="submit" value={postId ? "update":"Save"}/>
        </form>
        <h1>addedit</h1>
    </div>
  )
}

export default Addedit