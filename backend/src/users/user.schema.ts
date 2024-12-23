import { Schema, Document } from 'mongoose';

export interface User extends Document {
  username: string;
  password: string;
  email: string;
  profilePhoto?: string; 
}

export const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  profilePhoto: { type: String, required: true }, // Optional
});

// Add the following export to make User usable as a value
export const UserModelName = 'User';