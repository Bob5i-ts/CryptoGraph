import { increment, push, ref, update } from 'firebase/database';
import { useEffect, useRef, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useDatabase, useDatabaseListData, useDatabaseObjectData, useStorage, useUser } from 'reactfire';
import { ProfileImage } from '../MainWrapper/Common';

export default function PostDetails() {
    const db = useDatabase();
    const storage = useStorage();
    const postID = useRouteMatch().params.id;
    const postRef = ref(db, 'posts/' + postID);
    const { status, data: post } = useDatabaseObjectData(postRef);
    const { data: user } = useUser();
    const [postInput, setPostInput] = useState('');
    const [ isEdit, setEdit ] = useState(false);
    useEffect(() => {
        document.title = 'Post by ' + post.author;
    }, []);
    if (status === 'loading') return null;
    else if (!post) return <h3>Post not found</h3>

    function deletePost() {
            update(ref(db), {[`posts/${postID}`]: null})
    }
    function cancelEdit() {
        if (postInput != post.text) setPostInput(post.text);
        setEdit(false);
    }
    return (
        <div className='post-modal-bg'>
            <div className='post-modal-body'>
                <div>
                    <div className='post-img-wrap'>
                        <ProfileImage storage={storage} uid={post.uid}/>
                    </div>
                    <h4>{post.author}</h4>
                    <textarea value={postInput || post.text} disabled={!isEdit}
                        onChange={ev => setPostInput(ev.target.value)} cols='60' rows='5'
                    />
                </div>
                {(user && user?.uid === post.uid) &&
                    <div>
                        {!isEdit ?
                            <>
                                <button className='edit-btn' onClick={() => setEdit(true)}>Edit</button>
                                <button className='del-btn' onClick={deletePost}>Delete</button>
                            </> : <>
                                <button className='cancel-btn' onClick={cancelEdit}>Cancel</button>
                                <button className='update-post-btn' onClick={updatePost}>Submit</button>
                            </>
                        }
                    </div>
                }
            </div>
        </div>
    )
}