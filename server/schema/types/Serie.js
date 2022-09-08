const Frame = require("../../models/Frame");
const FrameType = require("./Frame");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
} = require("graphql");

const SerieType = new GraphQLObjectType({
  name: "Serie",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    detail: { type: GraphQLString },
    order: { type: GraphQLString },
    frames: {
      type: new GraphQLList(FrameType),
      resolve(parent, args) {
        return Frame.find({ serieId: parent._id });
      },
    },
  }),
});

module.exports = SerieType;
