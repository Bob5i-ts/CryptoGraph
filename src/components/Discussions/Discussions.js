import { ref, push } from 'firebase/database';
import { ref as storageRef, getDownloadURL } from 'firebase/storage';
import { useDatabase, useDatabaseListData, useStorage, useUser } from 'reactfire';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { MainToolbar, ProfileImage } from '../MainWrapper/Common';
import MainWrapper from '../MainWrapper/MainWrapper';
import './Discussions.css';

export function Posts() {
    const db = useDatabase();
    const postsRef = ref(db, 'posts');
    const { status, data } = useDatabaseListData(postsRef, { idField: 'id'});
    if (status === 'loading') {
        return <h3>Fetching posts...</h3>
    } else if (!data) {
        return <h3>No posts</h3>
    }
    return (
        <>
            {data.map(post => (
                <Link to={'/post/' + post.id} className='post-card' key={post.id}>
                    <div className='post-div d1'>
                        <div className='card-img-wrap'>
                            <ProfileImage storage={storage} uid={post.uid}/>
                        </div>
                        <h5>{post.author}</h5>
                    </div>
                    <div className='post-div d2'>
                        <p>{post.text}</p>
                    </div>
                </Link>
            ))}
        </>
    )
}

function Discussions() {
    const db = useDatabase();
    const postsRef = ref(db, 'posts');
    const user = useUser().data
    const [formActive, setFormActive] = useState(false);
    const [search, setSearch] = useState();
    const postText = useRef()
    function sendPost() {
        let postData = {
            author: user.displayName,
            uid: user.uid,
            userImg: user.photoURL,
            text: postText.current.value,
            comments: 0,
            time: Date.now()
        }
        push(postsRef, postData);
    }

    return (
        <MainWrapper>
            <MainToolbar>
                <input type='search' className='search-input' placeholder='' value={search} onChange={setSearch} />
                <button className={'new-post-btn' + (formActive ?' active':'')}
                    onClick={() => formActive ? setFormActive(false) : setFormActive(true)}
                > New post
                </button>
            </MainToolbar>
            {formActive
                ? <div className='new-post-form'>
                    <textarea className='post-input' placeholder='Add new post'
                        ref={postText} cols='50' rows='3'
                    />
                    <button className='post-send-btn' onClick={sendPost}>Send</button>
                </div>
                : null
            }
            <Route path='/community' component={Posts} />
        </MainWrapper>
    )
}

export default Discussions;