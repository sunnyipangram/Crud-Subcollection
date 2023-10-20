import React from 'react'
import '../Css/Profile.css'
import { useAppContext } from '../ContextApi/AppContext'

const StyledNewPost = ({UserProfile}) => {
   
    const {setOpen}=useAppContext()

  return (
    <>
    <main className="profile" onClick={()=>setOpen(true)}>
     <div className="m-mrg" id="composer">
          <div id="c-tabs-cvr">
            <div className="tb" id="c-tabs">
              <div className="td active"><i className="material-icons">subject</i><span>Make Post</span></div>
              <div className="td"><i className="material-icons">camera_enhance</i><span>Photo/Video</span></div>
              <div className="td"><i className="material-icons">videocam</i><span>Live Video</span></div>
              <div className="td"><i className="material-icons">event</i><span>Life Event</span></div>
            </div>
          </div>
          <div id="c-c-main">
            <div className="tb">
              <div className="td" id="p-c-i"><img src={UserProfile?.profileImage} alt="Profile pic" /></div>
              <div className="td" id="c-inp">
                <input type="text" placeholder="What's on your mind?" />
              </div>
            </div>
            <div id="insert_emoji"><i className="material-icons">insert_emoticon</i></div>
          </div>
        </div>
        </main>
    </>
  )
}


export default StyledNewPost