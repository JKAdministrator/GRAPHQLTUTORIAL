const {
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLID,
  GraphQLList,
} = require("graphql");
const Frame = require("../../models/Frame");
const Image = require("../../models/Image");
const FrameType = require("../types/Frame");

const FrameMutations = {
  addFrame: {
    type: FrameType,
    args: {
      name: { type: GraphQLNonNull(GraphQLString) },
      detail: { type: GraphQLNonNull(GraphQLString) },
      order: { type: GraphQLNonNull(GraphQLInt) },
      serieId: { type: GraphQLNonNull(GraphQLID) },
      images: { type: GraphQLList(GraphQLString) },
    },
    async resolve(parent, args) {
      try {
        // create the frame document
        const frame = new Frame({
          name: args.name,
          detail: args.detail,
          order: args.order,
          serieId: args.serieId,
        });
        //save to database
        let frameDocument = await frame.save();
        // update all images with the frame id
        const sections = await Images.updateMany(
          { _id: { $in: args.images } },
          { frameId: frameDocument._id }
        );
        //return the frame document
        return frameDocument;
      } catch (e) {
        throw e;
      }
    },
  },
  updateFrame: {
    type: FrameType,
    args: {
      id: { type: GraphQLNonNull(GraphQLID) },
      name: { type: GraphQLNonNull(GraphQLString) },
      detail: { type: GraphQLNonNull(GraphQLString) },
      order: { type: GraphQLNonNull(GraphQLInt) },
      serieId: { type: GraphQLNonNull(GraphQLID) },
    },
    resolve(parent, args) {
      return Frame.findByIdAndUpdate(
        args.id,
        {
          $set: {
            name: args.name,
            detail: args.detail,
            order: args.order,
            serieId: args.serieId,
          },
        },
        { new: true }
      );
    },
  },
  deleteFrame: {
    type: FrameType,
    args: {
      id: { type: GraphQLNonNull(GraphQLID) },
    },
    resolve(parent, args) {
      return Frame.findByIdAndRemove(args.id);
    },
  },
};

module.exports = FrameMutations;
