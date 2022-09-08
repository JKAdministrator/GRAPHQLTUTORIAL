const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
} = require("graphql");

const FrameType = new GraphQLObjectType({
  name: "Frame",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    detail: { type: GraphQLString },
    order: { type: GraphQLString },
    serie: {
      type: SerieType,
      resolve(parent, args) {
        return Serie.findById(parent.serieId);
      },
    },
    images: {
      type: new GraphQLList(ImageType),
      resolve(parent, args) {
        return Image.find({ frameId: parent._id });
      },
    },
  }),
});

module.exports = FrameType;

//goes bottom to circunvent circular dependencies
const SerieType = require("./Serie");
const Serie = require("../../models/Serie");
const ImageType = require("./Image");
const Image = require("../../models/Image");
