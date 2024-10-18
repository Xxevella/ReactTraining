import React, { useMemo, useState } from "react";
import './styles/app.css';
import PostList from "./component/PostList";
import PostForm from "./component/PostForm";
import PostFilter from "./component/PostFilter";
import MyModal from "./component/UI/MyModal/MyModal";
import MyButton from "./component/UI/button/MyButton";



function App() {

  const [posts, setPosts] = useState([
    {id:1, title:"ббб", body:"ааа"},
    {id:2, title:"ааа", body:"ббб"},
    {id:3, title:"ввв", body:"ввв "},
  ])
  const [filter, setFilter] = useState({sort:'', query: ''})
  const [modal, setModal] = useState(false);


  const sortedPosts = useMemo(() =>{
    if(filter.sort){
      return [...posts].sort((a,b)=>a[filter.sort].localeCompare(b[filter.sort]))
    }
    return posts;
  }, [filter.sort, posts])

  const sortedAndSearchedPosts = useMemo(()=>{
    return sortedPosts.filter(post => post.title.toLocaleLowerCase().includes(filter.query))

  }, [filter.query, sortedPosts])

  const createPost = (newPost) =>
  {
    setPosts([...posts, newPost])
  }

  const removePost = (post) =>{
    setPosts(posts.filter(p => p.id !== post.id))
  }

  return (
    <div className="App">
      <MyButton onClick={() => setModal(true)}>Создать пост</MyButton>
      <MyModal visible={modal} setVisible={setModal}><PostForm create={createPost}/></MyModal>
      <hr style={{margin: '15px 0'}}/>
      <PostFilter 
       filter={filter}
       setFilter={setFilter}
      />
       <PostList remove={removePost} posts={sortedAndSearchedPosts} title={"Посты про JS"}/> 
    </div>
  );
}

export default App;
