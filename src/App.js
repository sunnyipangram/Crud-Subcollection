









import './App.css';
import React from 'react';

import Home from './Pages/Home';
import Auth from './Pages/Auth';
import { useAppContext } from './ContextApi/AppContext';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import ProfilePage from './Pages/ProfilePage';
import EditProfile from './Pages/EditProfile';









function App() {
 


 const {User} = useAppContext(null)

 console.log(User)
 


  
 

  

  
 
  

  return (
    <BrowserRouter>
    <div className="App">
   
      {User===null?
       <Routes>
      <Route path="/" element={ <Auth/>}></Route>
      </Routes>
      : 
      
      <Routes>
        <Route path="/" element={ <Home/>}></Route>
        <Route path="/profile" element={ <ProfilePage/>}></Route>
        <Route path="/editProfile" element={ <EditProfile/>}></Route>
         </Routes>
      
     }
     
     
    

     
      {/* <table>
        <tr>
          <th>OS Name</th>
          <th>OS Sub COllection</th>

          <th>Add New</th>


        </tr>
        {loading ?<h1>Loading"</h1> 
          : <>{docs?.map((doc, index) => {
            return (
              <>

                <tr>
                  <td><AiFillDelete style={{ color: 'red' }} onClick={()=>deleteFeildFunction(doc)}/><AiFillEdit onClick={() => editDataFunction(doc)}/>{doc.name}</td>
                  <td >
                    <table>
                      <tr>

                      <ChildrenList
                path={`Os/${doc.name}/Children`}
                parentDocId={doc.id}
                subcollectionName="Children"
              />
                      </tr>
                      </table>
                      
                      </td>
                  <td > <AddNew path={`Os/${doc.name}/Children`} /></td>
                </tr>


               


              </>
            )
          })}</>
        }
      </table> */}
     
      
    </div>
    </BrowserRouter>
  );
}

export default App;
