import mongoose, { Schema, Document } from 'mongoose';

export interface IItem extends Document {
  name: string;
  price: number;
  quantity: number;
  description: string;
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
  rating: number;
  image: string;
}

const itemSchema: Schema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  description: { type: String },
  isAvailable: { type: Boolean, required: true },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true },
  rating: { type: Number, required: false },
  image: { type: String, required: false },
});

export default mongoose.model<IItem>('Item', itemSchema);
