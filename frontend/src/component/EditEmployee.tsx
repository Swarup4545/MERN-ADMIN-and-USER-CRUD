import axios from 'axios';
import React, { useState } from 'react';
import { updateEmployee } from '../services/api';

const EditEmployee = () => {
  const queryParameters = new URLSearchParams(window.location.search);
  const token = localStorage.getItem("token");
  const id = queryParameters.get("id");

  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [number, setNumber] = useState('');
  const [gender, setGender] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

   
    if (!id || !token) {
      console.error('Missing required id or token');
      return; 
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('role', role);
    formData.append('number', number);
    formData.append('gender', gender);

    if (image) {
      formData.append('image', image);
    }

    try {
      const updatedEmployee = await updateEmployee(id, formData, token);
      console.log('Response update', updatedEmployee);
      

      setName('');
      setRole('');
      setNumber('');
      setGender('');
      setImage(null);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 403) {
          alert("Access denied, admin only")
          setError('Unauthorized. Invalid or expired token.');
        } else {
          setError('An error occurred while fetching employees.');
        }
      }
      console.error('Error updating employee:', error);
    }
  };

  return (
    <div>
      Edit Employee
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Employee Name"
            className="w-full p-2 border"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Employee Role"
            className="w-full p-2 border"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            placeholder="Employee Number"
            className="w-full p-2 border"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            placeholder="Employee Gender"
            className="w-full p-2 border"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="file"
            onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
            className="w-full p-2 border"
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white py-2 px-4">
          Update Employee
        </button>
      </form>
    </div>
  );
};

export default EditEmployee;
