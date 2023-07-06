import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import { Admin } from "./pages/Admin";
function App() {

  return (
    <div className="App w-screen h-screen">
      <BrowserRouter>
          <Routes>
              <Route path="/table=:id/admin" element={<Admin/>}></Route>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
