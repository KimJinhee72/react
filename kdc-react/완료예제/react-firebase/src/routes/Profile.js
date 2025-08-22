import React, { useEffect, useState } from "react";
import { getAuth, signOut, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import profile from '../profile_icon.svg';
import { getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";
import { db } from '../firebase';
import Post from '../components/Post';
import { collection, onSnapshot ,query, where, orderBy} from "firebase/firestore"; 

const Profile = ()=>{
    const auth = getAuth();
    const user = auth.currentUser;
    const navigate = useNavigate();
    const onLogoutClick = () =>{        
        signOut(auth).then(() => {
            alert('로그아웃 되었습니다.');
            navigate("/");
        }).catch((error) => {
            console.log(error);
        });
    }
    //console.log(auth.currentUser.uid);
    const [profileImg, setProfileImg] = useState(profile);
    const [posts,setPosts] = useState([]);

    const getUserPosts = async ()=>{
        const q = query(collection(db, "posts"), where("uid", '==', user.uid),orderBy('date', 'desc'));
        onSnapshot(q, (querySnapshot) => {
            const postArr = querySnapshot.docs.map((doc) =>({
                ...doc.data(),
                id:doc.id 
                })
            );
            setPosts(postArr);
        });
    }


    useEffect(()=>{
        user.photoURL.includes('firebase') && setProfileImg(user.photoURL);
        getUserPosts();
    },[]);


    const updateLogo = async (e)=>{        
        const {target:{files}} = e;
        const file = files[0];
        const storage = getStorage();
        const profileLogoRef = ref(storage, `avatars/${user.uid}`);
        const result = await uploadBytes(profileLogoRef, file);
        const profileUrl = await getDownloadURL(result.ref);
        //console.log(profileUrl);
        setProfileImg(profileUrl);
        await updateProfile(user, {
            photoURL:profileUrl
        })
    }
    return(        
        <>        
        <div className="profile">
            <div>
                <img src={profileImg} className="profile-logo" alt="logo"/>
                <h3>{user.displayName}</h3>
            </div>
            <input type="file" className="hidden" accept="image/*" name="profile" id="profile" onChange={updateLogo} />
            <label type="button" htmlFor="profile">Update Profile</label>
        </div>
        <button onClick={onLogoutClick}>Logout</button>
        <hr/>
        <h3>My Post List</h3>
        <ul className="postlist">
            {
                posts.map(item=>(
                    <Post key={item.id} postObj={item} />
                ))
            }
        </ul>
        </>
    )
}
export default Profile;