const Frame = require("../../models/Frame");
const FrameType = require("../types/Frame");

const { GraphQLID, GraphQLList } = require("graphql");

const FrameQueries = {
  frame: {
    type: FrameType,
    args: { id: { type: GraphQLID } },
    resolve(parent, args) {
      return Frame.findById(args.id);
    },
  },
  frames: {
    type: new GraphQLList(FrameType),
    resolve(parent, args) {
      return Frame.find();
    },
  },
};

module.exports = FrameQueries;
