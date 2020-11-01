import React from 'react';
import './App.css';
import Nav from './components/nav'
import AddPostForm from './components/addPost/addPostForm'
import PostContainer from './components/displayPost/postContainer'
import Login from './components/Login/login'
import { BrowserRouter, Route } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
    <Route exact path='/' >
        <Nav></Nav>
        <p>Home</p>
      </Route>
      <Route exact path='/blog'>
        <div className="App">
          <Nav></Nav>
          <AddPostForm></AddPostForm>
          <PostContainer></PostContainer>
        </div>
      </Route>
      <Route exact path='/login' >
        <Nav></Nav>
        <Login></Login>
      </Route>


    </BrowserRouter>
  );
}

export default App;
