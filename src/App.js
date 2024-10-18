import React, { useState } from "react";
import Counter from "./component/Counter";
import ClassCounter from "./component/ClassCounter";
import './styles/app.css';
import PostItem from "./component/PostItem";
import PostList from "./component/PostList";



function App() {

  const [posts, setPosts] = useState([
    {id:1, title:"Javascript", body:"Description"},
    {id:2, title:"Javascript 2", body:"Description"},
    {id:3, title:"Javascript 3 ", body:"Description"},
  ])

  const [posts2, setPosts2] = useState([
    {id:1, title:"Python", body:"Description"},
    {id:2, title:"Python 2", body:"Description"},
    {id:3, title:"Python 3 ", body:"Description"},
  ])


  return (
    <div className="App">
      <form>
        <input type="text" placeholder="Название поста"/>
        <input type="text" placeholder="Описание поста"/>
        <button>Создать пост</button>
      </form>
      <PostList posts={posts} title={"Посты про JS"}/>

    </div>
  );
}

export default App;
