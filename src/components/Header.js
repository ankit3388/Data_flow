import React,{useEffect,useState} from 'react'
import {useNavigate, Link,useLocation} from "react-router-dom";
import "./Header.css";


function Header () {
    const[activeTab,setActiveTab]=useState("Home");
    const location=useLocation();
    const [search,setSearch]=useState("");
    const history=useNavigate();
    useEffect(()=>{
        if(location.pathname==="/"){
            setActiveTab("Home");
        }
        else if(location.pathname==='/addedit')
        {
            setActiveTab("AddEdit")
        }
        else if(location.pathname==='/about')
        {
            setActiveTab("about");
        }
    },[location]);
    const handleSubmit= (e) =>{
        e.preventDefault();
        history(`/search ? name=${search}`)
        setSearch("");

    }
  return (
    <div className="header">
        <p className="logo">ContactApp</p>
        <div className="header-right">
            <form onSubmit={handleSubmit} style={{display:"inline"}}>
                <input type="text" className="inputField" placeholder="Search Name..." onChange={(e)=> setSearch(e.target.value)} value={search}/>
            </form>
            <Link to="/">
                <p className={`${activeTab ==='Home'? "active" : " "}`} onClick={() => setActiveTab("Home")}>
                    Home
                </p>
            </Link>
            <Link to="/addedit">
                <p className={`${activeTab ==='Addedit'? "active" : " "}`} onClick={() => setActiveTab("Addedit")}>
                    AddContact
                </p>
            </Link>
            <Link to="/about">
                <p className={`${activeTab ==='About'? "active" : " "}`} onClick={() => setActiveTab("")}>
                    About
                </p>
            </Link>
        </div>
    </div>
  )
};

export default Header