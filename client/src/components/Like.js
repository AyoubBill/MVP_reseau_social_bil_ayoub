import React, { useEffect, useState } from 'react';
import AuthService from '../services/auth.service';
import { BiLike } from 'react-icons/bi';
import { AiFillLike } from 'react-icons/ai';
import '../styles/Like.css';
import Axios from 'axios';


const Like = ({ post }) => {
    const user = AuthService.getCurrentUser();
    const [liked, setLiked] = useState(false);
    const [likeNumber, setLikeNumber] = useState(0);

    useEffect(() => {
        if (user) {
            if (post.likers.includes(user.userId)) {
                setLiked(true);
            }
        }
        setLikeNumber(post.likers.length);
    }, [post.likers]);

    const like = () => {
        Axios.patch(`http://localhost:3000/api/post/like-post/${post._id}`, { id: user.userId })
            .then(res => {
                setLikeNumber(res.data.likers.length);
                setLiked(true);
            })
            .catch(err => console.log(err))
    }

    const unLike = () => {
        Axios.patch(`http://localhost:3000/api/post/unlike-post/${post._id}`, { id: user.userId })
            .then(res => {
                setLikeNumber(res.data.likers.length);
                setLiked(false);
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            {user === null &&
                <div className='like'>
                <BiLike className='read-post-unlike' onClick={like} />
                <span>{likeNumber}</span>
            </div>
            }
            {user && liked === false &&
                <div className='like'>
                    <BiLike className='read-post-like' onClick={like} />
                    <span>{likeNumber}</span>
                </div>
            }
            {user && liked &&
                <div className='like'>
                    <AiFillLike className='read-post-like' onClick={unLike} />
                    <span>{likeNumber}</span>
                </div>
            }
        </>
    )
}

export default Like