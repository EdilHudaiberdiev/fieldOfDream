import {Route, Routes} from 'react-router-dom';
import Toolbar from './Components/Toolbar/Toolbar';
import Home from './Containers/Home/Home';

const App = () => {

  return (
    <>
      <header>
        <Toolbar/>
      </header>
      <main className="container">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="*" element={(<h1>Not found</h1>)}/>
        </Routes>
      </main>
    </>
  );
};

export default App
