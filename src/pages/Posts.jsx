import React, { useEffect, useRef, useState } from "react";
import '../styles/App.css';
import PostList from "../component/PostList";
import PostForm from "../component/PostForm";
import PostFilter from "../component/PostFilter";
import MyModal from "../component/UI/MyModal/MyModal";
import MyButton from "../component/UI/button/MyButton";
import { usePosts } from "../hooks/usePost";
import PostService from "../API/PostService";
import Loader from "../component/UI/loader/Loader";
import { useFetching } from "../hooks/useFetching";
import { getPageCount } from "../utils/pages";
import Pagination from "../component/UI/pagination/Pagination";
import { useObserver } from "../hooks/useObserver";
import MySelect from "../component/UI/select/MySelect";

function Posts() {
    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState({ sort: '', query: '' });
    const [modal, setModal] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
    const lastElement = useRef();

    const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
        const response = await PostService.getAll(limit, page);
        setPosts(prev => [...prev, ...response.data]);
        const totalCount = response.headers['x-total-count'];
        setTotalPages(getPageCount(totalCount, limit));
    });

    useObserver(lastElement, page < totalPages, isPostsLoading, () => {
        setPage(page + 1);
    });

    useEffect(() => {
        if (limit === -1) {
            const fetchAllPosts = async () => {
                const response = await PostService.getAll(1000, 1);
                setPosts(response.data);
                const totalCount = response.headers['x-total-count'];
                setTotalPages(1);
            };
            fetchAllPosts();
        } else {
            fetchPosts(limit, page);
        }
    }, [page, limit]);

    const createPost = (newPost) => {
        setPosts([...posts, newPost]);
        setModal(false);
    };

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id));
    };

    const changePage = (page) => {
        setPage(page);
    };

    return (
        <div className="App">
            <MyButton style={{ marginTop: '30px' }} onClick={() => setModal(true)}>Создать пост</MyButton>
            <MyModal visible={modal} setVisible={setModal}><PostForm create={createPost} /></MyModal>
            <hr style={{ margin: '15px 0' }} />
            <PostFilter 
                filter={filter}
                setFilter={setFilter}
            />
            <MySelect 
                value={limit}
                onChange={value => setLimit(value)}
                defaultValue={'Кол-во элементов на странице'}
                options={[
                    { value: 5, name: 5 },
                    { value: 10, name: 10 },
                    { value: 25, name: 25 },
                    { value: -1, name: 'Показать всё' },
                ]}
            />
            {postError && <h1>Произошла ошибка: {postError}</h1>}
            <PostList remove={removePost} posts={sortedAndSearchedPosts} title={"Посты про JS"} />
            <div ref={lastElement} style={{ height: 20, background: 'red' }} />
            {isPostsLoading &&
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}><Loader /></div>
            }
            <Pagination 
                page={page} 
                changePage={changePage} 
                totalPages={totalPages}
            />
        </div>
    );
}

export default Posts;