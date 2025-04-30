import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './store';
import AppRouter from './components/routes';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Provider store={store}>
        <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
          <AppRouter />
        </PersistGate>
      </Provider>
    </Router>
  );
}

export default App;
