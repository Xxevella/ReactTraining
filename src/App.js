import React, { useMemo, useState } from "react";
import './styles/app.css';
import PostList from "./component/PostList";
import PostForm from "./component/PostForm";
import PostFilter from "./component/PostFilter";



function App() {

  const [posts, setPosts] = useState([
    {id:1, title:"ббб", body:"ааа"},
    {id:2, title:"ааа", body:"ббб"},
    {id:3, title:"ввв", body:"ввв "},
  ])
  const [filter, setFilter] = useState({sort:'', query: ''})


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
      <PostForm create={createPost}/>
      <hr style={{margin: '15px 0'}}/>
      <PostFilter 
       filter={filter}
       setFilter={setFilter}
      />
      {sortedAndSearchedPosts.length
       ?<PostList remove={removePost} posts={sortedAndSearchedPosts} title={"Посты про JS"}/>
       : <div style={{textAlign: 'center'}}>Посты не были найдены</div>
      } 
      
    </div>
  );
}

export default App;
