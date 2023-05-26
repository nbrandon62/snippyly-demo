import { useState } from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from './FirebaseConfig';
import { Editor } from './components/Editor';
import TopBar from './components/TopBar';
import { SnippylyCursor } from '@snippyly/react';

function App() {
  const [user, setUser] = useState(null);

  const provider = new GoogleAuthProvider();

  const handleGoogleLogin = async () => {
    const credentials = await signInWithPopup(auth, provider);
    const { user } = credentials;
    const { uid, displayName, email, photoURL } = user;
    const snippylyUser = {
      userId: uid,
      name: displayName,
      email,
      photoUrl: photoURL,
    };
    setUser(snippylyUser);
  };

  return (
    <>
    <SnippylyCursor />
      <TopBar
        handleLogin={handleGoogleLogin}
        handleSetUser={setUser}
        user={user}
      />
      <Editor />
    </>
  );
}

export default App;
