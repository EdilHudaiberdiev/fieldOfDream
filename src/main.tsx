import ReactDOM from 'react-dom/client'
import {Provider} from 'react-redux';
import App from './App'
import './index.css'
import 'bootstrap/dist/css/bootstrap.css';
import {BrowserRouter} from 'react-router-dom';
import {store} from './app/store';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </Provider>
);
