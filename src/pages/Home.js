import React,{useState,useEffect} from 'react'
import fireDb from "../firebase";
import "./Home.css";
import {Link } from "react-router-dom";
import {toast} from "react-toastify";

const Home =() =>
{
    const[data,setData]=useState({});
    const [sortedData,setSortedData]=useState([]);
    const [sort,setSort]=useState(false);
    useEffect(() =>{
        fireDb.child("contact").on("value",(snapshot)=>{
            if(snapshot.val()!=null)
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

    },[]);
    const onDelete =(id)=>
    {
        if(window.confirm("Are you sure that wanted to delete that contact ?"))
        {
            fireDb.child(`contact/${id}`).remove((err)=>
            {
                if(err)
                {
                    toast.error(err);

                }
                else
                {
                    toast.success("Contact Deleted Sucessfully");
                }
            });
        }
    };
    const handleChange =(e) =>{
       setSort(true);
       fireDb
       .child("contact")
       .orderByChild(`${e.target.value}`)
       .on("value",(snapshort) =>{
        let sortedData=[];
        snapshort.forEach((snap) => {
            sortedData.push(snap.val())
        });
        setSortedData(sortedData);
       })
    };
    const handleReset =() =>{
        setSort(false);
        fireDb.child("contact").on("value",(snapshot)=>{
            if(snapshot.val()!=null)
            {
                setData({...snapshot.val()});
            }
            else
            {
                setData({});
            }
        });
    };
    const filterData=(value) =>{
        fireDb
        .child("contact")
        .orderByChild("status")
       .equalTo(value)
       .on("value",(snapshort)=>{
        if(snapshort.val())
        {
            const data=snapshort.val();
            setData(data);
        }
    })
     };

  return (
    <div style={{ marginTop:"100px"}}>
        <table classname="styled-table">
            <thead>
                <th style={{textAlign:"center"}}>No.</th>
                <th style={{textAlign:"center"}}>Name </th>
                <th style={{textAlign:"center"}}>Email</th>
                <th style={{textAlign:"center"}}>Contact</th>
                <th style={{textAlign:"center"}}>Status</th>
                {!sort && <th style={{textAlign:"center"}}>Action</th>}
            </thead>
            {!sort && (
                <tbody>
                {Object.keys(data).map((id,index)=>{
                return(
                    <tr keys={id}>
                        <th scope="row">{index+1}</th>
                        <td>{data[id].name}</td>
                        <td>{data[id].email}</td>
                        <td>{data[id].contact}</td>
                        <td>{data[id].status}</td>
                        <td>
                            <Link to={`/update/${id}`}>
                                <button className="btn btn-edit">Edit</button>
                            </Link>
                            <button className="btn btn-delete" onClick ={()=> onDelete(id)}>Delete</button>
                            <Link to={`/view/${id}`}>
                                <button className="btn btn-edit">View</button>
                            </Link>
                        </td>
                    </tr>
                );
                })};
            </tbody>
            )}
            {sort && (
                <tbody>
                    {
                        sortedData.map((item,index) =>{
                            return(
                                <tr key={index}>
                                    <th scope='row'>{index+1}</th>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.contact}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            )}

        </table>
        <lable>Sort By:</lable>
        <select className="dropdown" name="colValue" onChange={handleChange}>
            <option>Please select</option>
            <option value ="name">Name</option>
            <option value ="Email">Email</option>
            <option value ="contact">Contact</option>
            <option value ="status">Status</option>
            <option value ="name">Name</option>
        </select>
        <button className="btn btn-reaset" onClick={handleReset}>Reset</button>
        <label>Status</label>
        <button className="btn btn-active" onClick={() =>
        filterData("Active")}>Active</button>
        <button className="btn btn-inactive" onClick={() =>
        filterData("Inactive")}>Inactive</button>
        <h1>Home</h1>
    </div>
  )
}

export default Home