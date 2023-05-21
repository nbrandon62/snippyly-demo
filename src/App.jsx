import { SnippylyProvider, useSnippylyClient } from '@snippyly/react';
import { useState } from 'react';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from './FirebaseConfig';
import { Editor } from './components/Editor';
import TopBar from './components/TopBar';
import Comment from './components/Comment';

function App() {
  const provider = new GoogleAuthProvider();
  const { client } = useSnippylyClient();
  const apiKey = import.meta.env.VITE_SNIPPYLY_API_KEY;
  const [user, setUser] = useState(null);


  const handleSnippylyLogin = async () => {
    const credentials = await signInWithPopup(auth, provider);
    const { user } = credentials;
    setUser(user);
    const { uid, displayName, email, photoURL } = user;
    
    console.log(uid, displayName, email, photoURL);
    console.log('snippyly client', client);
  };

  const signOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SnippylyProvider apiKey={apiKey}>
      {/* <Comment />  */}
      <TopBar
        handleLogin={handleSnippylyLogin}
        handleLogout={signOut}
        user={user}
      />
      <Editor />
    </SnippylyProvider>
  );
}

export default App;
