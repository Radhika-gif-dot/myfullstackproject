import { Schema, Document } from 'mongoose';

export const TaskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  status: {
    type: String,
    enum: ['To Do', 'In Progress', 'Done'],
    default: 'To Do',
  },
  dueDate: { type: Date, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User model

});

export interface Task extends Document {
  id: string;
  title: string;
  description: string;
  status: string;
  dueDate: Date;
  user: string;
}
