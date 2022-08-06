import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { AuthProvider, DatabaseProvider, useFirebaseApp } from 'reactfire';
import './css/App.css';

function App() {
  const app = useFirebaseApp();
  const auth = getAuth(app);
  const db = getDatabase(app);
  return (
    <AuthProvider sdk={auth}>
      <DatabaseProvider sdk={db}>
      </DatabaseProvider>
    </AuthProvider>
  );
}

export default App;
