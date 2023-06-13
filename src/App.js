import React from 'react';
import './App.css';
import {BrowserRouter, Routes,Route} from "react-router-dom";
import About from './pages/About';
import Addedit from './pages/Addedit';
import Home from './pages/Home';
import View from './pages/View';
import Header from './components/Header';
import Search from './pages/Search';
import {ToastContainer} from "react-toastify"
// import "react-toastify/dist/ReactTastify.css"






function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Header/>
      <ToastContainer position='top-center'></ToastContainer>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/addedit/:postId" component={<Addedit/>}/>
      <Route path="/addedit" element={<Addedit/>}/>
      {/* <Route path="/view/:postId" component={View}/> */}
      <Route path="/view" component={View}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/search" element={<Search/>}/>


    </Routes>

    </div>
    </BrowserRouter>
  );
}

export default App;
