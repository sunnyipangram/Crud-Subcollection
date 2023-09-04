
import './App.css';
import { collection } from 'firebase/firestore';

import {useCollectionData} from 'react-firebase-hooks/firestore'
import { db } from './FirebaseConfig';
import ChildrenList from './ChildrenList';
import AddNew from './AddNew';

function App() {
  const query=collection(db,'Os')
  const [docs,loading,error]=useCollectionData(query)
  console.log(docs)
  return (
    <div className="App">

     Oparating System
     {loading && "loading..."}
     {loading?"Loading"
     :<>{docs?.map((doc,index)=>{
      return(
        <>
      <ul>{doc.name}</ul>
      <ChildrenList path={`Os/${doc.name}/Children`}/>
      <AddNew path={`Os/${doc.name}/Children`}/>
        </>
      )
     })}</>
     }
     <AddNew path={'Os'}/>
    </div>
  );
}

export default App;
