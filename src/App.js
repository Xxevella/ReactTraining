import React, { useRef, useState } from "react";
import Counter from "./component/Counter";
import ClassCounter from "./component/ClassCounter";
import './styles/app.css';
import PostItem from "./component/PostItem";
import PostList from "./component/PostList";
import MyButton from "./component/UI/button/MyButton";
import MyInput from "./component/UI/input/MyInput";



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

  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")

  const addNewPost = (e) =>
  {
    e.preventDefault()
    const newPost ={
      id: Date.now(),
      title,
      body
    }
    setPosts([...posts, newPost])
    setTitle('')
    setBody('')
  }

  return (
    <div className="App">
      <form>
        <MyInput 
         onChange={e=>setTitle(e.target.value)}
         value={title}
         type="text" 
         placeholder="Название поста"/>

        <MyInput 
         onChange={e=>setBody(e.target.value)}
         value={body}
         type="text" 
         placeholder="Описание поста"/>
        <MyButton onClick={addNewPost}>Создать пост</MyButton>
      </form>
      <PostList posts={posts} title={"Посты про JS"}/>

    </div>
  );
}

export default App;
