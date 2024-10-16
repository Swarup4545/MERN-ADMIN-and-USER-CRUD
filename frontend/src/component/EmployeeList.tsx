import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { fetchEmployees, createEmployee, deleteEmployee, updateEmployee } from '../services/api';

interface Employee {
    _id: string;
    name: string;
    role: string;
    number: string;
    gender: string;
    imageUrl: string;
  }

  export const EmployeeList = () => { 
  const token = localStorage.getItem('token') || '';
  const [employees,setEmployees]=useState<Employee[]>([]);

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

    useEffect(() => {
      const fetchData = async () => {
        const data = await fetchEmployees(token);
        setEmployees(data);
      };
      fetchData();
    }, [token]);

    return (
      <>
      <div>
        {employees.length > 0 ? (
          <ul>
            {employees.map((employee) => (
              <li key={employee._id} className="flex justify-between items-center border p-4 mb-2">
                <div className="p-2">
                  <p className="text-xl">Name: {employee.name}</p>
                  <p className="text-xl">Role: {employee.role}</p>
                  <p className="text-xl">Number: {employee.number}</p>
                  <p className="text-xl">Gender: {employee.gender}</p>
                  <img src={`http://localhost:8000${employee.imageUrl}`} alt={employee.name} className="h-28 w-28 border border-black"/>
                </div>
                <div>
                  <Link to={`/admin/dashboard/editemployee/?id=${employee._id}`} ><button  className="mr-4 bg-yellow-400 p-2">Edit</button></Link>
                  <button onClick={() => handleDelete(employee._id)} className="bg-red-600 text-white p-2">Delete</button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No employees found.</p>
        )}
      </div>
      <Outlet/></>
    );
  };
  