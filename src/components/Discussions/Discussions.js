import { ref, push } from '@firebase/database';
import { useDatabase, useDatabaseListData, useUser } from 'reactfire';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import MainWrapper from '../MainWrapper/MainWrapper';
import { MainToolbar } from '../MainWrapper/Elements';
import './Discussions.css';

export function GetImage({ uid }) {
    const storage = useStorage();
    const [url, setUrl] = useState('/img/default.png')
    if (uid) getDownloadURL(storageRef(storage, `userPics/${uid}.png`))
        .then(url => setUrl(url))
        .catch(null);
    return <img src={url} alt='user' />
}
export function AllPosts() {
    const db = useDatabase();
    const postsRef = ref(db, 'posts');
    const { status, data } = useDatabaseListData(postsRef, { idField: 'id'})
    if (status === 'loading') {
        return <h3>Fetching posts...</h3>
    } else if (!data) {
        return <h3>No posts</h3>
    }
    return (
        <>
        {data.map(post => (
                <Link key={post.id} to={'/post/' + post.id} className='post-card'>
                    <div className='post-div d1'>
                        <img src={post.userImg} alt='' />
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
            <AllPosts />
        </MainWrapper>
    )
}

export default Discussions;