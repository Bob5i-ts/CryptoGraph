import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';
import { AuthProvider, DatabaseProvider, StorageProvider, useFirebaseApp } from 'reactfire';
import { Switch, Route, BrowserRouter, Redirect} from 'react-router-dom';
import { PrivateWrapper, PublicWrapper } from './components/AuthWrappers';
import HomePage from './components/HomePage/HomePage';
import AuthPage from './components/AuthPage/AuthPage';
import './css/App.css';

function App() {
  const app = useFirebaseApp();
  const auth = getAuth(app);
  const db = getDatabase(app);
  const storage = getStorage(app);

  return (
    <AuthProvider sdk={auth}>
      <DatabaseProvider sdk={db}>
        <StorageProvider sdk={storage}>
        <BrowserRouter>
          <PublicWrapper>
            <Switch>
              <Route path='/home' component={HomePage} />
              <Route path='/auth' component={AuthPage} />
              <Route children={<Redirect to='/home'/>} />
            </Switch>
          </PublicWrapper>
          <PrivateWrapper>
          </PrivateWrapper>
        </BrowserRouter>
        </StorageProvider>
      </DatabaseProvider>
    </AuthProvider>
  );
}

export default App;
