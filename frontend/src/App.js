import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';

import ListTask from './components/ListTask';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

function App() {
  return (
    <div className="container">
    <div className="App">
      <h1 class="page-header text-center">Task Management System </h1>
 
      <BrowserRouter> 
        <Routes>
          <Route index element={<ListTask />} />
          {/* <Route path="task/create" element={<CreateUser />} />
          <Route path="task/:id/edit" element={<EditUser />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
    </div>
  );
}

export default App;
