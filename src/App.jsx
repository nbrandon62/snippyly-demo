import { SnippylyProvider } from '@snippyly/react';
import { useState } from 'react';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from './FirebaseConfig';
import { Editor } from './components/Editor';
import TopBar from './components/TopBar';
import Comment from './components/Comment';

function App() {
  const provider = new GoogleAuthProvider();
  const apiKey = import.meta.env.VITE_SNIPPYLY_API_KEY;
  const [user, setUser] = useState(null);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
      setUser(auth.currentUser);
    } catch (err) {
      console.log(err);
    }
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
        handleLogin={signInWithGoogle}
        handleLogout={signOut}
        user={user}
      />
      <Editor />
    </SnippylyProvider>
  );
}

export default App;
