import React, { useEffect,useState } from 'react'
import '../Css/Profile.css'
import { useAppContext } from '../ContextApi/AppContext'
import { collection } from 'firebase/firestore'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { db } from '../FirebaseConfig'
import Navbar from './Navbar'
import ProfilePost from './ProfilePost'

const Profile = () => {

  const {User,UserProfile}=useAppContext()
  const [UserPosts, setUserPosts] = useState([])

  const query=collection(db,'Posts')
  const [docs,loading,error]=useCollectionData(query)
  console.log(docs,"all posts")

  const filteredPosts = docs?.filter((post) => post.user.id === UserProfile.id);

  useEffect(() => {
    // filteredPosts now contains only the posts posted by the specific user
    setUserPosts(filteredPosts)
  }, [docs]);
  console.log(UserPosts,'filterd')
  



  return (
    <main className='profile'>
  
  {/* <header>
    <div className="tb">
      <div className="td" id="logo">
        <a href="#"><i className="fab fa-facebook-square" /></a>
      </div>
      <div className="td" id="search-form">
        <form method="get" action="#">
          <input type="text" placeholder="Search Facebook" />
          <button type="submit"><i className="material-icons">search</i></button>
        </form>
      </div>
      <div className="td" id="f-name-l"><span>{UserProfile?.firstName}'s facebook</span></div>
      <div className="td" id="i-links">
        <div className="tb">
          <div className="td" id="m-td">
            <div className="tb">
              <span className="td"><i className="material-icons">person_add</i></span>
              <span className="td"><i className="material-icons">chat_bubble</i></span>
              <span className="td m-active"><i className="material-icons">notifications</i></span>
            </div>
          </div>
          <div className="td">
            <a href="#" id="p-link">
              <img src={UserProfile?.profileImage} />
            </a>
          </div>
        </div>
      </div>
    </div>
  </header> */}
  <Navbar/>
  <div id="profile-upper">
    <div id="profile-banner-image">
      <img src="https://imagizer.imageshack.com/img921/9628/VIaL8H.jpg" alt="Banner image" />
    </div>
    <div id="profile-d">
      <div id="profile-pic">
        <img src={UserProfile?.profileImage} />
      </div>
      <div id="u-name">{UserProfile?.firstName+" "+UserProfile?.lastName}</div>
      <div className="tb" id="m-btns">
        <div className="td">
          <div className="m-btn"><i className="material-icons">format_list_bulleted</i><span>Activity log</span></div>
        </div>
        <div className="td">
          <div className="m-btn"><i className="material-icons">lock</i><span>Privacy</span></div>
        </div>
      </div>
      <div id="edit-profile"><i className="material-icons">camera_alt</i></div>
    </div>
    <div id="black-grd" />
  </div>
  <div id="main-content">
    <div className="tb">
      <div className="td" id="l-col">
        <div className="l-cnt">
          <div className="cnt-label">
            <i className="l-i" id="l-i-i" />
            <span>Intro</span>
            <div className="lb-action"><i className="material-icons">edit</i></div>
          </div>
          <div id="i-box">
            <div id="intro-line">Front-end Developer</div>
            <div id="u-occ">I love making applications with React.Js</div>
            <div id="u-loc"><i className="material-icons">location_on</i><a href="#">Aligarh</a>, <a href="#">India</a></div>
          </div>
        </div>
        <div className="l-cnt l-mrg">
          <div className="cnt-label">
            <i className="l-i" id="l-i-p" />
            <span>Photos</span>
            <div className="lb-action" id="b-i"><i className="material-icons">keyboard_arrow_down</i></div>
          </div>
          <div id="photos">
            <div className="">
              <div className="row">
                {UserPosts?.map((post)=>{
                  return <div className="col-md-4" ><img src={post.image} className='img-fluid' alt="" /></div>
                })}
               
              </div>
            </div>
          </div>
        </div>
        <div className="l-cnt l-mrg">
          <div className="cnt-label">
            <i className="l-i" id="l-i-k" />
            <span>Did You Know<i id="k-nm">1</i></span>
          </div>
          <div>
            <div className="q-ad-c">
              <a href="#" className="q-ad">
                <img src="https://imagizer.imageshack.com/img923/1849/4TnLy1.png" />
                <span>My favorite superhero is...</span>
              </a>
            </div>
            <div className="q-ad-c">
              <a href="#" className="q-ad" id="add_q">
                <i className="material-icons">add</i>
                <span>Add Answer</span>
              </a>
            </div>
          </div>
        </div>
        <div id="t-box">
          <a href="#">Privacy</a> <a href="#">Terms</a> <a href="#">Advertising</a> <a href="#">Ad Choices</a> <a href="#">Cookies</a> <span id="t-more">More<i className="material-icons">arrow_drop_down</i></span>
          <div id="cpy-nt">Facebook © <span id="curr-year" /></div>
        </div>
      </div>
      <div className="td" id="m-col">
        <div className="m-mrg" id="p-tabs">
          <div className="tb">
            <div className="td">
              <div className="tb" id="p-tabs-m">
                <div className="td active"><i className="material-icons">av_timer</i><span>TIMELINE</span></div>
                <div className="td"><i className="material-icons">people</i><span>FRIENDS</span></div>
                <div className="td"><i className="material-icons">photo</i><span>PHOTOS</span></div>
                <div className="td"><i className="material-icons">explore</i><span>ABOUT</span></div>
                <div className="td"><i className="material-icons">archive</i><span>ARCHIVE</span></div>
              </div>
            </div>
            <div className="td" id="p-tab-m"><i className="material-icons">keyboard_arrow_down</i></div>
          </div>
        </div>
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
              <div className="td" id="p-c-i"><img src={User.photoURL} alt="Profile pic" /></div>
              <div className="td" id="c-inp">
                <input type="text" placeholder="What's on your mind?" />
              </div>
            </div>
            <div id="insert_emoji"><i className="material-icons">insert_emoticon</i></div>
          </div>
        </div>
        <div>
          <ProfilePost UserProfile={UserProfile} UserPosts={UserPosts}/>
          <div className="post">
            <div className="tb">
              <a href="#" className="td p-p-pic"><img src={UserProfile?.profileImage} alt="Rajeev's profile pic" /></a>
              <div className="td p-r-hdr">
                <div className="p-u-info">
                  <a href="#">{UserProfile?.firstName} {UserProfile?.lastName}</a> shared a memory with <a href="#">{UserProfile?.firstName} </a>
                </div>
                <div className="p-dt">
                  <i className="material-icons">calendar_today</i>
                  <span>January 28, 2015</span>
                </div>
              </div>
              <div className="td p-opt"><i className="material-icons">keyboard_arrow_down</i></div>
            </div>
            <a href="#" className="p-cnt-v">
              <img src="https://imagizer.imageshack.com/img923/8568/6LwtUa.jpg" />
            </a>
            <div>
              <div className="p-acts">
                <div className="p-act like"><i className="material-icons">thumb_up_alt</i><span>25</span></div>
                <div className="p-act comment"><i className="material-icons">comment</i><span>1</span></div>
                <div className="p-act share"><i className="material-icons">reply</i></div>
              </div>
            </div>
          </div>
        </div>
        <div id="loading"><i className="material-icons">autorenew</i></div>
      </div>
     
    </div>
  </div>
  <div id="device-bar-2"><i className="fab fa-apple" /></div>
</main>

  )
}

export default Profile