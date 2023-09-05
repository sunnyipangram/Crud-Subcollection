
import './App.css';
import { collection } from 'firebase/firestore';

import { useCollectionData } from 'react-firebase-hooks/firestore'
import { db } from './FirebaseConfig';
import ChildrenList from './ChildrenList';
import AddNew from './AddNew';

function App() {
  const query = collection(db, 'Os')
  const [docs, loading, error] = useCollectionData(query)
  console.log(docs)
  return (
    <div className="App">

      Oparating System
      <table>
        <tr>
          <th>OS Name</th>
          <th>OS Sub COllection</th>

          <th>Add New</th>


        </tr>
        {loading ? "Loading"
          : <>{docs?.map((doc, index) => {
            return (
              <>

                <tr>
                  <td>{doc.name}</td>
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
      </table>
      <AddNew path={'Os'} />
    </div>
  );
}

export default App;
