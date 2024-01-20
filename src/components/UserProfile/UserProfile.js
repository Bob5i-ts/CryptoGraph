import { useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { ref, uploadBytesResumable } from 'firebase/storage';
import { useAuth, useStorage } from 'reactfire';
import SimpleWrapper from '../SimpleWrapper/SimpleWrapper';
import { ProfileImage } from '../MainWrapper/Common';
import './UserProfile.css';

function UserProfile() {
    const auth = useAuth();
    const storage = useStorage();
    useEffect(() => document.title = 'User profile | CryptoGraph');

    function uploadImage(ev) {
        console.log(ev.target.files);
        const selectedFile = ev.target.files[0];
        const fileRef = ref(storage, 'userPics/' + auth.currentUser.uid + '.png');
        uploadBytesResumable(fileRef, selectedFile);
    }

    return (
        <SimpleWrapper>
            <div className='profile-img-div'>
                <div className='profile-img-wrap'>
                    <ProfileImage storage={storage} uid={auth.currentUser.uid}/>
                </div>
                <h5>Change profile image</h5>
                <input type="file" accept='image/png' onChange={uploadImage} />
            </div>

            <div className='user-data-div'>
                <h3>{auth.currentUser.displayName}</h3>
                <button onClick={() => signOut(auth)}>Log out</button>
                <p>Email: <b>{auth.currentUser.email}</b></p>
                <button>Change Email</button> <br/>
                <button>Change Password</button>
            </div>
        </SimpleWrapper>
    )
}

export default UserProfile;