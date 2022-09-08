const Image = require("../../models/Image");
const ImageType = require("../types/Image");

const { GraphQLID, GraphQLList } = require("graphql");

const ImageQueries = {
  images: {
    type: new GraphQLList(ImageType),
    resolve(parent, args) {
      return Image.find();
    },
  },
  image: {
    type: ImageType,
    args: { id: { type: GraphQLID } },
    resolve(parent, args) {
      return Image.findById(args.id);
    },
  },
};

module.exports = ImageQueries;
