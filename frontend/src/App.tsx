import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EditEmployee from './component/EditEmployee';
import  EmployeeForm  from './component/EmployeeForm';
import { EmployeeList } from './component/EmployeeList';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UserDashboard from './pages/UserDashboard';
// import AdminDashboard from './pages/AdminDashboard';
// import UserDashboard from './pages/UserDashboard';
// import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin/dashboard" element={<AdminDashboard/>} >
            <Route path='' element={<EmployeeForm/>}></Route>
            <Route path='editemployee' element={<EditEmployee/>}></Route>
            <Route path='listemployee' element={<EmployeeList/>}></Route>
          </Route>
          <Route path="/user/dashboard" element={<UserDashboard/>} />
          {/* <Route path="*" element={<NotFound />} />  */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
