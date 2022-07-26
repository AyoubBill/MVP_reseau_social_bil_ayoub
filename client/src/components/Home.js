import React, { useEffect, useState } from 'react';
import '../styles/Home.css';
import { BsFillFileEarmarkImageFill } from 'react-icons/bs';
import { IoMdSend } from 'react-icons/io';
import { AiOutlineEdit } from 'react-icons/ai';
import AuthService from '../services/auth.service';
import { useNavigate } from 'react-router-dom';
import avatar from '../images/avatar.png';
import Like from '../components/Like';
import authHeader from '../services/auth-header';

const Home = () => {
    const [description, setDescription] = useState('');
    const [postsList, setPostsList] = useState([]);
    const [users, setUsers] = useState([]);
    const user = AuthService.getCurrentUser();
    let navigate = useNavigate();
    const [file, setFile] = useState();

    const getData = () => {
        authHeader().get('/post')
            .then(res => setPostsList(res.data))
            .catch((err) => console.log(err))
    }

    const postData = (data) => {
        authHeader().post('/post', data)
            .then(res => {
                alert(res.data.message)
            })
            .catch(err => console.log(err));
    }

    const getUsers = () => {
        authHeader().get('/auth')
            .then(res => setUsers(res.data))
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        getData();
        getUsers();
    }, []);

    const uploadImage = (e) => {
        setFile(e.target.files[0])
    }

    const handlePost = (e) => {
        e.preventDefault();

        if (file || description) {
            const post = new FormData();
            post.append('userId', user.userId);
            post.append('description', description);
            post.append('image', file);
            postData(post)
        } else {
            alert('Vous devez remplir le champ');
        }
        getData();
    };

    return (
        <div className='home'>
            <div className="home-picture"></div>
            {user ? (
                <>
                    <div className='create-post'>
                        <div className='create-post-header'>
                            <div className='user-profile-avatar'>
                                <img src={avatar} alt='avatar' />
                                <b>{user.username}</b>
                            </div>

                            <textarea className='create-post-input'
                                name='description'
                                placeholder="Write something.."
                                onChange={(e) => setDescription(e.target.value)}
                            >
                            </textarea>

                        </div>
                        <div className="create-post-image">
                            <label htmlFor='file-input'>
                                Select image
                                <BsFillFileEarmarkImageFill className='create-post-icon' />
                            </label>
                            <input id="file-input" type="file" name='image' onChange={uploadImage} />
                            <div>
                                Publish
                                <IoMdSend className='create-post-icon' onClick={handlePost} />
                            </div>
                        </div>
                    </div>
                    {
                        postsList.map(post => {
                            return <div className='read-post' key={post._id}>
                                <div className='user-profile-avatar'>
                                    <img src={avatar} alt='avatar' />
                                    {users.map(elt => {
                                        return elt._id === post.userId && <b key={elt._id}>{elt.username}</b>
                                    })}
                                </div>
                                {post.imageUrl ? (
                                    <div className='read-post-body'>
                                        <p>{post.description}</p>
                                        <div className='read-post-image'>
                                            <img src={post.imageUrl} alt='my post' />
                                        </div>
                                        <div className='read-post-icons'>
                                            <Like post={post} />
                                            {post.userId === user.userId || user.roles === 'administrateur' ? (
                                                <AiOutlineEdit
                                                    className='read-post-icon-login'
                                                    onClick={() => navigate(`/post/${post._id}`)}
                                                />
                                            ) : (
                                                // <AiOutlineEdit className='read-post-icon' />
                                                null
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <div className='read-post-body'>
                                        <p>{post.description}</p>
                                        <div className='read-post-icons'>
                                            <Like post={post} />
                                            {post.userId === user.userId || user.roles === 'administrateur' ? (
                                                <AiOutlineEdit
                                                    className='read-post-icon-login'
                                                    onClick={() => navigate(`/post/${post._id}`)}
                                                />
                                            ) : (
                                                // <AiOutlineEdit className='read-post-icon' />
                                                null
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        })
                    }
                </>

            ) : (
                <>
                    {
                        postsList.map(post => {
                            return <div className='read-post' key={post._id}>
                                <div className='user-profile-avatar'>
                                    <img src={avatar} alt='avatar' />
                                    {users.map(elt => {
                                        return elt._id === post.userId && <b key={elt._id}>{elt.username}</b>
                                    })}
                                </div>
                                {post.imageUrl ? (
                                    <div className='read-post-body'>
                                        <p>{post.description}</p>
                                        <div className='read-post-image'>
                                            <img src={post.imageUrl} alt='my post' />
                                        </div>
                                        <div className='read-post-icons'>
                                            <Like post={post} />
                                            <AiOutlineEdit className='read-post-icon' />
                                        </div>
                                    </div>
                                ) : (
                                    <div className='read-post-body'>
                                        <p>{post.description}</p>
                                        <div className='read-post-icons'>
                                            <Like post={post} />
                                            <AiOutlineEdit className='read-post-icon' />
                                        </div>
                                    </div>
                                )}
                            </div>
                        })
                    }
                </>
            )}
        </div>
    )
}

export default Home