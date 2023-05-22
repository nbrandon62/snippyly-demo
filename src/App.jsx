import { SnippylyProvider } from '@snippyly/react';
import { useState } from 'react';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from './FirebaseConfig';
import { Editor } from './components/Editor';
import TopBar from './components/TopBar';
import Comment from './components/Comment';

function App() {
  const [user, setUser] = useState(null);

  const provider = new GoogleAuthProvider();
  const apiKey = import.meta.env.VITE_SNIPPYLY_API_KEY;

  const handleSnippylyLogin = async () => {
    const credentials = await signInWithPopup(auth, provider);
    const { user } = credentials;
    const { uid, displayName, email, photoURL } = user;
    const snippylyUser = {
      userId: uid,
      name: displayName,
      email,
      photoURL,
    };
    setUser(snippylyUser);
  };

  const handleGoogleLogout = async () => {
    try {
      await signOut(auth);
      alert('You have been logged out');
      setUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SnippylyProvider apiKey={apiKey}>
      <TopBar
        handleLogin={handleSnippylyLogin}
        handleLogout={handleGoogleLogout}
        user={user}
      />
      <Editor />
      <Comment />
    </SnippylyProvider>
  );
}

export default App;
