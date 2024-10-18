import React, {useState} from "react";
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";

const PostForm = function ({create}){
    const [post, setPost] = useState({title:'', body:''})

    const addNewPost = (e) =>
        {
          e.preventDefault()
          const newPost = {
            ...post, id: Date.now()
          }
          create(newPost)
          setPost({title:'', body:''})
        }
    
    return (
        
        <div>
         <form>
             <MyInput 
              onChange={e=>setPost({...post, title: e.target.value})}
              value={post.title}
              type="text" 
              placeholder="Название поста"/>
     
             <MyInput 
              onChange={a=>setPost({...post, body: a.target.value})}
              value={post.body}
              type="text" 
              placeholder="Описание поста"/>
             <MyButton onClick={addNewPost}>Создать пост</MyButton>
         </form>
        </div>
    );
}

export default PostForm;