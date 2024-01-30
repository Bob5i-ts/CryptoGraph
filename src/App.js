import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';
import { AuthProvider, DatabaseProvider, StorageProvider, useFirebaseApp } from 'reactfire';
import { Switch, Route, BrowserRouter, Redirect} from 'react-router-dom';
import { PrivateWrapper, PublicWrapper } from './components/AuthWrappers';
import HomePage from './components/HomePage/HomePage';
import AuthPage from './components/AuthPage/AuthPage';
import Prices from './components/Prices/Prices';
import News from './components/News/News';
import FindATM from './components/FindATM/FindATM';
import Discussions from './components/Discussions/Discussions';
import UserProfile from './components/UserProfile/UserProfile';
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
              </Switch>
            </PublicWrapper>
            <PrivateWrapper>
              <Switch>
                <Route path='/prices/:exchange/:coin' component={Prices} />
                <Route path='/news' component={News} />
                <Route path='/find-atm' component={FindATM} />
                <Route path='/community' component={Discussions} />
                <Route path='/profile' component={UserProfile} />
              </Switch>
            </PrivateWrapper>
          </BrowserRouter>
        </StorageProvider>
      </DatabaseProvider>
    </AuthProvider>
  );
}

export default App;
