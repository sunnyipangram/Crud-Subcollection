import React, { useState } from 'react'

const Dsa3 = () => {
    const [IndexToInsert, setIndexToInsert] = useState(null)
    const [ValueToInsert, setValueToInsert] = useState(null)
    const [NewArray, setNewArray] = useState([])
    

    // how to insert element into array without prebuilt functions 
    const MyArrray=[1,2,3,4,5,6,7,8,9,10]
    console.log(MyArrray)
    function InsertNumber(){

        for(let i=MyArrray.length-1; i>=0; i--){
            MyArrray[IndexToInsert]= parseInt(ValueToInsert)
            console.log(MyArrray[i])
        }
        console.log(MyArrray)
    setNewArray(MyArrray)
    console.log(NewArray)

    }
    
    


  return (
    <div>
        
        <input type="text" placeholder='position to insert' value={IndexToInsert} onChange={(e)=>setIndexToInsert(e.target.value)} />
        <input type="number" placeholder='value to insert' value={ValueToInsert}  onChange={(e)=>setValueToInsert(e.target.value)}/>
        <button onClick={InsertNumber}></button>
    </div>
  )
}

export default Dsa3