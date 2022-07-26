import React, { useEffect, useState } from 'react';
import '../styles/Post.css';
import { BsFillFileEarmarkImageFill } from 'react-icons/bs';
import AuthService from '../services/auth.service';
import { useParams, useNavigate } from 'react-router-dom';
import avatar from '../images/avatar.png';
import authHeader from '../services/auth-header';

const Post = () => {
  const [post, setPost] = useState({});
  const [description, setDescription] = useState('');
  const user = AuthService.getCurrentUser();
  let { id } = useParams();
  let navigate = useNavigate();
  const [file, setFile] = useState();

  const getData = () => {
    authHeader().get(`/post/${id}`)
      .then(res => setPost(res.data))
      .catch((err) => console.log(err))
  }

  const postData = (data) => {
    authHeader().post(`/post/${id}`, data)
      .then(res => {
        console.log(res.data.message)
      })
      .catch(err => console.log(err));
    getData();
  }

  useEffect(() => {
    getData();
  }, []);

  const updateImage = (e) => {
    setFile(e.target.files[0]);
  }

  const handleChange = (e) => {
    e.preventDefault();

    const newPost = new FormData();
    newPost.append('userId', user.userId);
    newPost.append('description', description);
    newPost.append('image', file);

    postData(newPost);
  }

  const handleDelete = (e) => {
    e.preventDefault();
    authHeader().delete(`/post/${id}`)
      .then(res => {
        alert(res.data.message);
        navigate('/');
      })
      .catch(err => console.log(err))
  };

  return (
    <div className='post'>
      <div className='post-picture'></div>
      <div className='post-container'>
        <div className='post-avatar'>
          <img src={avatar} alt='avatar' />
          <b>{user.username}</b>
        </div>
        <div className='post-body'>
          <div>
            <textarea className='post-input'
              defaultValue={post.description}
              onChange={(e) => setDescription(e.target.value)}
            >
            </textarea>
          </div>
          {post.imageUrl && <>
            <div className='post-image'>
              <img src={post.imageUrl} alt='my post' />
            </div>
            <div className="profile-image">
              <label htmlFor='file-input'>
                Change image
                <BsFillFileEarmarkImageFill className='profile-icon' />
              </label>
              <input id="file-input" type="file" name='image' onChange={updateImage} />
            </div>
          </>}
          <div className='post-btn'>
            <button className='profile-btn change' onClick={handleChange}>Change</button>
            <button className='profile-btn delete' onClick={handleDelete}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post