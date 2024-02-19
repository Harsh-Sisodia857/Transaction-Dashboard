const mongoose = require('mongoose')

const connectDatabase = () => {
    mongoose
        .connect("mongodb+srv://harshkumarsisodia99:O74FVLIfXRV3lgXL@cluster0.ks55g6u.mongodb.net/transaction", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then((data) => {
            console.log(`Mongodb Atlas connected with server`);
        }).catch((err) => {
            console.log(err);
        });
};
module.exports = connectDatabase;