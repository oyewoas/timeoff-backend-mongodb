const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LeaveSchema = new Schema({
    type_of_leave: {
        type: String, 
        required: true,
        index:true 
    },
    from: {
        type: Date, 
        required: true
    },
    to: {
        type: Date, 
        required: true
    },
    reason: {
        type: String, 
        required: true,
    },
    user: [{ type: Schema.Types.ObjectId, ref: 'Users' }],
    status: {
        type: String, 
        default: 'Not Approved'
    },

    approved_by: {
        type: String,
    },
    date_created: {
        type: Date,
        default: Date.now,
    }

    
});

// LeaveSchema.statics.getUser = ()=>{
//     User.findById(this.user)
// };

const LeaveModel = mongoose.model('Leaves', LeaveSchema);

module.exports = LeaveModel;