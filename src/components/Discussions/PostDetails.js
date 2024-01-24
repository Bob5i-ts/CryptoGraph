import { increment, push, ref, update } from 'firebase/database';
import { useEffect, useRef, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useDatabase, useDatabaseListData, useDatabaseObjectData, useStorage, useUser } from 'reactfire';
import { ProfileImage } from '../MainWrapper/Common';

function Comments ({ db, storage, postID, user }) {
    const commInputRef = useRef();
    const commsRef = ref(db, 'comments/' + postID);
    const { status, data: comms } = useDatabaseListData(commsRef, { idField: 'id' });
    if (status === 'loading') return null;
    else if (!comms) return <h3>No comments</h3>

    return (
        <>
            {user &&
                <div>
                    <textarea className='comment-input' ref={commInputRef} placeholder='New comment' cols='50' rows='2' />
                </div>
            }
            {comms.length > 0 && comms.map(comm => (
                <article className='comment' key={comm.id}>
                    <div className='comm-img-wrap'>
                        <ProfileImage storage={storage} uid={comm.uid} />
                    </div>
                    <h5>{comm.author}</h5>
                    <div className='comm-text'>{comm.text}</div>
                    {user.uid === comm.uid &&
                    }
                </article>
            ))}
        </>
    );
}

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

    function updatePost() {
        if (!postInput || postInput == post.text) return;
        update(postRef, {
            text: postInput,
            editTime: Date.now()
        }).then(() => setEdit(false))
            .catch(err => alert(err));
    }
    function deletePost() {
        update(ref(db), { [`posts/${postID}`]: null });
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
                        <ProfileImage storage={storage} uid={post.uid} />
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
                <Comments db={db} storage={storage} postID={postID} user={user} />
            </div>
        </div>
    );
}