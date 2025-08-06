import { Document, model, models, Schema } from "mongoose";


// TO KNOW EXACTLY WHICH PROPERTY THE ORDER SCHEMA HAS, WE HAVE TO IMPORT AN INTERFACE
export interface Iorder extends Document {
    createdAt: Date
    stripeId: string
    totalAmount: string
    event: {
        _id: string
        title: string
    }
    buyer: {
        _id: string
        firstName: string
        lastName: string
    }
}

export type IorderItem = {
    _id: string
    totalAmount: string
    createdAt: Date
    eventTitle: string
    eventId: string
    buyer: string
}

// CREATE AN ORDER SCHEMA
const OrderSchema = new Schema({
    createdAt: { type: Date, default: Date.now },
    stripeId: { type: String, required: true, unique: true },
    totalAmount: { type: String },
    event: { type: Schema.Types.ObjectId, ref: 'Event' },
    buyer: { type: Schema.Types.ObjectId, ref: 'User' }
})

// TURN THE ORDER SCHEMA INTO A MODEL

const Order = models.Order || model('Order', OrderSchema)

export default Order;