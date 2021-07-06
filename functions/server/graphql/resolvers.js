const { MongooseCon } = require("../utils/MongooseCon");
const mongooseCon = new MongooseCon()


const resolvers = {
    Query: {
        notes: async (_, __, context) => {
            // console.log(context.req.user);
            // if (!context.req.user) return null
            const notes = await mongooseCon.find('Note')
            return notes
        }

    },

    Mutation: {
        addNote: async (_, args, context) => {
            // console.log(context.req.user);
            // if (!context.req.user) return null
            const note = await mongooseCon.insert('Note', args)
            return note
        }
    }


};

module.exports = resolvers