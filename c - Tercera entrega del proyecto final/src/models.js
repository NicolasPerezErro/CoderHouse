import mongoose from 'mongoose';

export default mongoose.model('Users', {
    username: String,
    password: String,
    name: String,
    age: Number,
    address: String,
    phone: Number
});