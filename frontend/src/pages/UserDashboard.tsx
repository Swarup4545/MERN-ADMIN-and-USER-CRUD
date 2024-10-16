import React, { useEffect, useState } from 'react'
import { fetchEmployees } from '../services/api';

interface Employee {
  _id: string;
  name: string;
  role: string;
  number: string;
  gender: string;
  imageUrl: string;
}

const UserDashboard = () => {
  const token = localStorage.getItem('token') || '';
  const [employees, setEmployees] = useState<Employee[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchEmployees(token);
      setEmployees(data);
    };
    fetchData();
  }, [token]);
  return (
    <><nav className='bg-slate-800 border-gray-200 dark:bg-gray-900 p-3'>
      <span className='ml-10 text-3xl font-semibold'>UserDashboard</span>
    </nav>
      <div className='flex justify-center'>
        <div className="mt-8 w-[85%]">
          {employees.length > 0 ? (
            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {employees.map((employee) => (
                <li
                  key={employee._id}
                  className="bg-white shadow-lg rounded-lg overflow-hidden border  flex items-center"
                >
                  <div className='bg-slate-800 border-gray-200 dark:bg-gray-900 w-48 flex justify-center h-full p-3'>
                    <img
                      src={`http://localhost:8000${employee.imageUrl}`}
                      alt={employee.name}
                      className="h-24 w-24 rounded-full object-cover border border-red-200"
                    />
                  </div>

                  <div className="flex-1 p-3">
                    <p className="font-bold text-xl text-gray-800">{employee.name}</p>
                    <p className="text-xl text-gray-600">Role: {employee.role}</p>
                    <p className="text-xl text-gray-600">Number: {employee.number}</p>
                    <p className="text-xl text-gray-600">Gender: {employee.gender}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-lg">No employees found.</p>
          )}
        </div>

      </div>
    </>
  )
}

export default UserDashboard