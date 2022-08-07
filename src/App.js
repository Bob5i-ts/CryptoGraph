import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { AuthProvider, DatabaseProvider, useFirebaseApp } from 'reactfire';
import { Switch, Route, BrowserRouter, Redirect} from 'react-router-dom';
import { PrivateWrapper, PublicWrapper } from './components/AuthWrappers';
import './css/App.css';

function App() {
  const app = useFirebaseApp();
  const auth = getAuth(app);
  const db = getDatabase(app);
  return (
    <AuthProvider sdk={auth}>
      <DatabaseProvider sdk={db}>
        <BrowserRouter>
          <PublicWrapper>
          </PublicWrapper>
          <PrivateWrapper>
          </PrivateWrapper>
        </BrowserRouter>
      </DatabaseProvider>
    </AuthProvider>
  );
}

export default App;
