const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
    service:{ type: String, require: true },
    description:{ type: String, require: true },
    price:{ type: String, required: true },
    provider:{ type: String, required: true },
})

const Service = mongoose.model("Service",serviceSchema);

module.exports = Service;