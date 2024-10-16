import mongoose, { Document, Schema } from 'mongoose';

export interface IEmployee extends Document {
  name: string;
  number: string;
  role: string;
  gender: string;
  imageUrl: string;
}

const employeeSchema = new Schema<IEmployee>({
  name: { type: String, required: true },
  number: { type: String, required: true },
  role: { type: String, required: true },
  gender: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

export default mongoose.model<IEmployee>('Employee', employeeSchema);
