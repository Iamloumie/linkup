import { Schema, model, models, Document } from "mongoose";

// Define the User interface
export interface IUser extends Document {
  clerkId: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  photo: string;
  events?: string[]; // assuming these are ObjectIds as strings
  orders?: string[]; // assuming these are ObjectIds as strings
}

const UserSchema = new Schema<IUser>({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  photo: { type: String, required: true },
  events: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
  orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }]
});

const User = models.User || model<IUser>('User', UserSchema);

export default User;