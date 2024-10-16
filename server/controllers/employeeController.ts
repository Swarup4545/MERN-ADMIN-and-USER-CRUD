import { Request, Response } from 'express';
import Employee, { IEmployee } from '../models/Employee';

// Get all employees
export const getEmployees = async (req: Request, res: Response) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    console.log("erorr from get");
    res.status(500).json({ message: (error as Error).message });
  }
};

// Create a new employee
// export const createEmployee = async (req: Request, res: Response): Promise<void> => {
//     try {
//       // Create employee (replace with actual logic)
//       const employee = new Employee(req.body);
//       await employee.save();
//       res.status(201).json(employee);
//     } catch (error) {
//       res.status(500).json({ message: 'Error creating employee' });
//     }const { name, number, role, gender } = req.body;
//     const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';
  
//     try {
//       const employee = new Employee({
//         name,
//         number,
//         role,
//         gender,
//         imageUrl,
//       });
  
//       let user = await employee.save();
//       console.log("crested user",user);
//       res.status(201).json(employee);
//     } catch (error) {
//       console.log(error);
//       res.status(500).json({ message: (error as Error).message });
//     }
//   };

// Create a new employee
export const createEmployee = async (req: Request, res: Response): Promise<void> => {
    const { name, number, role, gender } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';
  
    try {
      // Create employee using the data from the request
      const employee = new Employee({
        name,
        number,
        role,
        gender,
        imageUrl,
      });
  
      const savedEmployee = await employee.save(); // Save the employee to the database
      console.log("Created user", savedEmployee);
  
      res.status(201).json(savedEmployee); // Send the created employee as response
    } catch (error) {
      console.error("Error creating employee:", error);
      res.status(500).json({ message: (error as Error).message }); // Handle any errors
    }
  };
  

// Update employee
export const updateEmployee = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, number, role, gender } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';

  try {
    const employee = await Employee.findByIdAndUpdate(
      id,
      { name, number, role, gender, imageUrl },
      { new: true }
    );
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// Delete employee
export const deleteEmployee = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await Employee.findByIdAndDelete(id);
    res.json({ message: 'Employee deleted' });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
