import { SnippylyCursor, SnippylyProvider } from '@snippyly/react';
import { useState } from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from './FirebaseConfig';
import { Editor } from './components/Editor';
import TopBar from './components/TopBar';

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
      photoUrl: photoURL,
    };
    setUser(snippylyUser);
  };

  return (
    <SnippylyProvider apiKey={apiKey}>
      <SnippylyCursor avatarMode={true} />
      <TopBar
        handleLogin={handleSnippylyLogin}
        handleSetUser={setUser}
        user={user}
      />
      <Editor />
    </SnippylyProvider>
  );
}

export default App;
