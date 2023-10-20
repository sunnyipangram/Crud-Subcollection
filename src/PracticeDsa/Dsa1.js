import React, { useState } from 'react'

const Dsa1 = () => {

  // array traversing = checkout element one by one
  const [Value, setValue] = useState(null)
  const [Valueab, setValueab] = useState(null)

  const MyArrray=[1,3,6,4,5,6 ,7,8,9,10]


 function FindValue(){

  setValueab(MyArrray[Value])
 }

  
 for (let i=0; i<MyArrray.length;i++ ) {
console.log(MyArrray[i])

  
}

  return (
    <div>
      {/* {MyArrray.map((value,indexedDB) => {
        return(
          <>
          <h1>{value}</h1>
          
          </>
        )
      })} */}
      <p>{Valueab}</p>
      <input type="text" value={Value} onChange={(e)=>setValue(e.target.value)} />
      <button onClick={FindValue}>find</button>
      
    </div>
  )
}

export default Dsa1