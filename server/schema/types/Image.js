const { GraphQLObjectType, GraphQLID, GraphQLString } = require("graphql");

const ImageType = new GraphQLObjectType({
  name: "Image",
  fields: () => ({
    id: { type: GraphQLID },
    public_id: { type: GraphQLString },
    secure_url: { type: GraphQLString },
    frame: {
      type: FrameType,
      resolve(parent, args) {
        return Frame.findById(parent.frameId);
      },
    },
  }),
});

module.exports = ImageType;

//goes bottom to circunvent circular dependencies
const FrameType = require("./Frame");
const Frame = require("../../models/Frame");
