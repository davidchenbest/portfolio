const { MONGODB_URI } = require('../config')
const mongoose = require('mongoose')

class MongooseCon {
    constructor() {
        if (this.constructor.instance) return this.constructor.instance
        this.constructor.instance = this
        this.conn = null
    }

    schemaSwitch = (modelName) => {
        switch (modelName) {
            case 'Note':
                return { title: String, content: String };

            default:
                return {};
        }
    }

    connect = async (modelName) => {
        if (this.conn == null) {
            this.conn = mongoose.createConnection(MONGODB_URI, {
                useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true,
                // Buffering means mongoose will queue up operations if it gets
                // disconnected from MongoDB and send them when it reconnects.
                // With serverless, better to fail fast if not connected.
                bufferCommands: false, // Disable mongoose buffering
                bufferMaxEntries: 0 // and MongoDB driver buffering
            });

            // `await`ing connection after assigning to the `conn` variable
            // to avoid multiple function calls creating new connections
            await this.conn;
            this.conn.model(modelName, new mongoose.Schema(this.schemaSwitch(modelName)));
        }
    }


    findOne = async (modelName, obj) => {
        await this.connect(modelName)



        const M = this.conn.model(modelName);
        const doc = await M.findOne(obj);
        return doc ? doc.toObject() : doc
    }

    insert = async (modelName, obj) => {
        await this.connect(modelName)
        const M = this.conn.model(modelName);
        const doc = await M.create(obj);
        return doc ? doc.toObject() : doc
    }

    find = async (modelName, obj = {}) => {
        await this.connect(modelName)
        const M = this.conn.model(modelName);
        const doc = await M.find(obj);
        return doc
    }


}

module.exports = { MongooseCon }