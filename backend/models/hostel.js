import mongoose from 'mongoose';

const hostelSchema = mongoose.Schema({
    name: {type: String, required: true},
    address: {type: String, required: true},
    phone: {
        type: String,
        default: 'Not Available'
    },
    owner_id: [String],
    owner_name: [String]
})

const hostelModel = mongoose.model('hostelModel',hostelSchema);

export default hostelModel;