const { Schema, model } = require("mongoose");

// const memberSchema = new Schema({
//     memberId: String,
//     project: 
//         {
//             type: Schema.Types.ObjectId,
//             ref: 'Project'
//         }
//     ,
//   }, {timestamp: true})



const memberSchema = new Schema({
    m_id: String,
    projects: [String]
});

module.exports = model('Members', memberSchema);