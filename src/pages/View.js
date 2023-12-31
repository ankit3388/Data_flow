import React ,{useState,useEffect} from 'react'
import {useParams,Link} from "react-router-dom";
import "./view.css";
import fireDb from "../firebase";

const View = () =>{
    const [user,setUser]=useState({});

    const { id }=useParams();

    useEffect(() =>{
        fireDb.child(`contact  /${id}`).get.then((snapshot) => {
            if(snapshot.exist())
            {
                setUser({...snapshot.val()})
            }
            else
            {
                setUser({});
            }
        })
    },[id]);
    console.log("user",user);
  return (
    <div style ={{marginTop:"150px"}}>
        <div className="card">
            <div className="card-header">
                <p> User Conatct Detail</p>
        </div>
        <div className="container">
            <strong>ID</strong>
            <span>{id}</span>
            <br/>
            <br/>
            <strong>Name:</strong>
            <span>{user.name}</span>
            <br/>
            <br/>

            <strong>Email:</strong>
            <span>{user.email}</span>
            <br/>
            <br/>

            <strong>Contact</strong>
            <span>{user.contact}</span>
            <br/>
            <br/>
            <Link to="/">
                <button className="btn btn-edit">Go Back</button>
            </Link>
            </div>
        <h1>View</h1>
        </div>
    </div>
  )
}

export default View