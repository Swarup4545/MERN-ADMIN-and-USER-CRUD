import { useEffect, useState } from 'react';
import { fetchEmployees, createEmployee, deleteEmployee, updateEmployee } from '../services/api';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';

interface Employee {
  _id: string;
  name: string;
  role: string;
  number: string;
  gender: string;
  imageUrl: string;
}

const AdminDashboard = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false); 
  const token = localStorage.getItem('token') || '';


  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchEmployees(token);
      setEmployees(data);
    };
    fetchData();
  }, [token]);

  
  const handleDelete = async (id: string) => {
    await deleteEmployee(id, token);
    setEmployees(employees.filter((emp) => emp._id !== id));
  };

  const handleEdit = (employee: Employee) => {
    setEditingEmployee(employee);
  };

  const handleUpdate = async (id: string, employee: FormData) => {
    const updatedEmployee = await updateEmployee(id, employee, token);
    setEmployees(
      employees.map((emp) => (emp._id === id ? updatedEmployee : emp))
    );
    setEditingEmployee(null);
  };
  const toggleNavbar = () => {
    setIsOpen(!isOpen); 
  };

  return (
    <><nav className="bg-slate-800 border-gray-200 dark:bg-gray-900">
    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">

        <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">Admin Dashboard</span>
      </a>
      <button
        onClick={toggleNavbar} 
        data-collapse-toggle="navbar-default"
        type="button"
        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        aria-controls="navbar-default"
        aria-expanded={isOpen ? 'true' : 'false'}
      >
        <span className="sr-only">Open main menu</span>
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 17 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 1h15M1 7h15M1 13h15"
          />
        </svg>
      </button>
      <div
        className={`${isOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`} 
        id="navbar-default"
      >
        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border  border-gray-100 rounded-lg  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 ">
          <li>
            <Link
              to="/admin/dashboard"
              className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent  md:p-0 dark:text-white md:dark:text-blue-500 md:hover:text-blue-500"
              aria-current="page"
            >
              Home
            </Link>
          </li>
          <li className='text-white'>
            <Link
              to="/admin/dashboard/listemployee"
              className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
            >
              Employee List
            </Link>
          </li>
         
        </ul>
      </div>
    </div>
  </nav>
  <Outlet/>
    </>

  );
};

export default AdminDashboard;
