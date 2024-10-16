// import { useEffect, useState } from 'react';
// interface Employee {
//     _id: string;
//     name: string;
//     role: string;
//     number: string;
//     gender: string;
//     imageUrl: string;
//   }
// interface EmployeeFormProps {
//   onSubmit: (employee: FormData) => void;
//   editingEmployee?: Employee | null;
//   onUpdate?: (id: string, employee: FormData) => void;
// }

// const EmployeeForm: React.FC<EmployeeFormProps> = ({ onSubmit, editingEmployee, onUpdate }) => {
//   const [name, setName] = useState('');
//   const [role, setRole] = useState('');
//   const [number, setNumber] = useState('');
//   const [gender, setGender] = useState('');
//   const [image, setImage] = useState<File | null>(null);

//   useEffect(() => {
//     if (editingEmployee) {
//       setName(editingEmployee.name);
//       setRole(editingEmployee.role);
//       setNumber(editingEmployee.number);
//       setGender(editingEmployee.gender);
//     }
//   }, [editingEmployee]);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append('name', name);
//     formData.append('role', role);
//     formData.append('number', number);
//     formData.append('gender', gender);
//     if (image) {
//       formData.append('image', image);
//     }

//     if (editingEmployee && onUpdate) {
//       onUpdate(editingEmployee._id, formData);
//     } else {
//       onSubmit(formData);
//     }

//     // Reset the form
//     setName('');
//     setRole('');
//     setNumber('');
//     setGender('');
//     setImage(null);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="mb-6">
//       <div className="mb-4">
//         <input
//           type="text"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           placeholder="Employee Name"
//           className="w-full p-2 border"
//           required
//         />
//       </div>
//       <div className="mb-4">
//         <input
//           type="text"
//           value={role}
//           onChange={(e) => setRole(e.target.value)}
//           placeholder="Employee Role"
//           className="w-full p-2 border"
//           required
//         />
//       </div>
//       <div className="mb-4">
//         <input
//           type="text"
//           value={number}
//           onChange={(e) => setNumber(e.target.value)}
//           placeholder="Employee Number"
//           className="w-full p-2 border"
//           required
//         />
//       </div>
//       <div className="mb-4">
//         <input
//           type="text"
//           value={gender}
//           onChange={(e) => setGender(e.target.value)}
//           placeholder="Employee Gender"
//           className="w-full p-2 border"
//           required
//         />
//       </div>
//       <div className="mb-4">
//         <input
//           type="file"
//           onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
//           className="w-full p-2 border"
//         />
//       </div>
//       <button type="submit" className="bg-blue-600 text-white py-2 px-4">
//         {editingEmployee ? 'Update Employee' : 'Add Employee'}
//       </button>
//     </form>
//   );
// };


// export default EmployeeForm;

import { useEffect, useState } from 'react';
import { createEmployee, fetchEmployees } from '../services/api'; // Ensure this fetches the employees with the correct token
import axios from 'axios';

interface Employee {
  _id: string;
  name: string;
  role: string;
  number: string;
  gender: string;
  imageUrl: string;
}

const EmployeeForm = () => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [number, setNumber] = useState('');
  const [gender, setGender] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    } else {
      setError('Token is missing. Please log in.');
    }
  }, []);

  
  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;
      try {
        const data = await fetchEmployees(token); 
        setEmployees(data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          if (err.response?.status === 401) {
            setError('Unauthorized. Invalid or expired token.');
          } else {
            setError('An error occurred while fetching employees.');
          }
        }
      }
    };
    
  
    fetchData();
  }, [token]);

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('role', role);
    formData.append('number', number);
    formData.append('gender', gender);
    if (image) {
      formData.append('image', image);
    }
    if(!token) return;
    try{
      const newEmployee = await createEmployee(formData, token);
      alert(newEmployee);
      console.log("data created",newEmployee);
      setEmployees([...employees, newEmployee]);
    }
    catch(err){
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 403) {
          alert("Access denied, admin only")
          setError('Unauthorized. Invalid or expired token.');
        } else {
          setError('An error occurred while fetching employees.');
        }
      }
    }
    
    setName('');
    setRole('');
    setNumber('');
    setGender('');
    setImage(null);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md mt-5">
  <h1 className="text-2xl font-bold mb-6 text-center">Employee Form</h1>
  {error && <p className="text-red-600 mb-4">{error}</p>}

  <form onSubmit={handleSubmit} className="space-y-4">
    <div>
      <label className="block mb-1 text-gray-700 font-semibold">Employee Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter employee name"
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>

    <div>
      <label className="block mb-1 text-gray-700 font-semibold">Employee Role</label>
      <input
        type="text"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        placeholder="Enter employee role"
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>

    <div>
      <label className="block mb-1 text-gray-700 font-semibold">Employee Number</label>
      <input
        type="text"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        placeholder="Enter employee number"
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>

    <div>
      <label className="block mb-1 text-gray-700 font-semibold">Employee Gender</label>
      <input
        type="text"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        placeholder="Enter employee gender"
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>

    <div>
      <label className="block mb-1 text-gray-700 font-semibold">Profile Image</label>
      <input
        type="file"
        onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
        className="w-full p-2 border border-gray-300 rounded focus:outline-none"
      />
    </div>

    <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200">
      Add Employee
    </button>
  </form>

  <div className="mt-8">
    <h2 className="text-xl font-semibold mb-4">Employees</h2>
    {employees.length > 0 ? (
      <ul className="list-disc pl-5 space-y-2">
        {employees.map((emp) => (
          <li key={emp._id}>
            <span className="font-bold">{emp.name}</span> - {emp.role}
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-gray-600">No employees found</p>
    )}
  </div>
</div>

  );
};

export default EmployeeForm;
