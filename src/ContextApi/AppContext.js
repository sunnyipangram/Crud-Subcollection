import { onAuthStateChanged } from 'firebase/auth';
import React,{createContext,useContext,useState,useEffect} from 'react'
import { auth } from '../FirebaseConfig';

const AppContext=createContext()
export  const useAppContext = () => useContext(AppContext);

const AppContextProvider = ({children}) => {

    const [CommentCount, setCommentCount] = useState(null)
    const [User, setUser] = useState(null)
  

    useEffect(() => {
      console.log('Starting useEffect');
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        console.log('Auth state changed:', user);
        if (user) {
          setUser(user);
        } else {
          // Handle signed out state
        }
      });
    
      // Don't forget to unsubscribe when the component unmounts
      return () => {
        console.log('Cleaning up useEffect');
        unsubscribe();
      };
    }, [User]);
    const handleLogout = async () => {
      try {
        await auth.signOut(); // Sign the user out
        console.log('User signed out');
        // You can also redirect the user to a different page after logout, if needed.
        setUser(null)
      } catch (error) {
        console.error('Error signing out:', error);
      }
    };
    
    

 
    console.log(User,'Auth')

  return (
    <AppContext.Provider value={{CommentCount,setCommentCount,User, setUser,handleLogout}}>
        {children}
    </AppContext.Provider>
    
  )
}
export default AppContextProvider

