// import mono,{Document,Schema} from 'mongoose';
// import bcrypt from "bcryptjs";
// import mongoose from 'mongoose';

// export interface IUser extends Document{
//     email:string;
//     password:string;
//     role:string;
//     matchPassword:(enteredPassword:string)=> Promise<boolean>;
// }
// const userSchema = new Schema<IUser>({
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//     role: {
//       type: String,
//       enum: ['user', 'admin'],
//       default: 'user',
//     },
//   });

//   userSchema.pre('save', async function (next) {
//     if (!this.isModified('password')) return next();
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
//   });

//   userSchema.methods.matchPassword = async function (enteredPassword: string) {
//     return await bcrypt.compare(enteredPassword, this.password);
//   };

//   export default mongoose.model<IUser>('User',userSchema);

import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  email: string;
  password: string;
  role: string;
  matchPassword: (password: string) => Promise<boolean>;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true }
});

// Method to match the password
UserSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model<IUser>('User', UserSchema);
export default User;
