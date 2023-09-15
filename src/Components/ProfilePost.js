import React from 'react'

const ProfilePost = ({UserProfile,UserPosts},props) => {



  
  return (
    <>
    {UserPosts?.map((post)=>{
      console.log(post)
      return(
        <div className="card custom-card">
        <div className="user-info">
          <div className="user-avatar">
            <img src={post.user.profileImg} width={50} height={50} className="rounded-circle" alt="User" />
          </div>
          <div className="user-details">
            <span className="font-weight-bold">{props.Fname} {props.Lname}</span>
          </div>
        </div>
        <div className="timestamp">
          <small>Timestamp</small>
        </div>
        <img src="post.image" className="img-fluid" alt="Post" />
        <div className="p-2">
          <p className="text-justify">
            <span className="post-title">{props.title}</span>
          </p>
          <p className="text-justify">
            <span className="post-content">{post.detail}</span>
          </p>
          <div className="action-buttons">
            <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
              <span className="btn-like">Like</span>
              <span className="comments-number">Comments Number</span>
              <span className="share-btn">Share</span>
            </div>
            <div>
              <button className="btn-edit">Edit</button>
              <button className="btn-delete">Delete</button>
            </div>
          </div>
          <hr />
        </div>
      </div>

      )
    })}
    
  



    </>
  
  )
}

export default ProfilePost