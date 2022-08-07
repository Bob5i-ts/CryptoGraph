import { ref, push } from '@firebase/database';
import { useDatabase, useDatabaseListData, useUser } from 'reactfire';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import MainWrapper from '../MainWrapper/MainWrapper';
import { MainToolbar } from '../MainWrapper/Elements';
import './Discussions.css';

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
