import { model, models, Schema } from "mongoose";

// To know exactly which property the model has, we create an Inteface

export interface IEvent extends Document {
  _id: string; // MongoDB will generate an ObjectId, but we can use string for simplicity
  title: string;
  description?: string;
  venue?: string;
  createdAt: Date;
  imageUrl: string;
  startDateTime: Date;
  endDateTime: Date;
  price?: string;
  isFree?: boolean;
  url?: string;
  category: { _id: string; name: string }; // Category is another model
  organizer: { _id: string; firstName: string; lastName: string }; // User is another model
}

const EventSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  venue: { type: String },
  createdAt: { type: Date, default: Date.now },
  imageUrl: { type: String, required: true },
  startDateTime: { type: Date, default: Date.now },
  endDateTime: { type: Date, default: Date.now },
  price: { type: String },
  isFree: { type: Boolean, default: false },
  url: { type: String },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  organizer: { type: Schema.Types.ObjectId, ref: "User" },
});

const Event = models.Event || model<IEvent>("Event", EventSchema);

export default Event;
