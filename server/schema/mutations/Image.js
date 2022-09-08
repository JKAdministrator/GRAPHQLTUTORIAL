const {
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLID,
} = require("graphql");
const Image = require("../../models/Image");
const ImageType = require("../types/Image");
const cloudinary = require("cloudinary");
const ImageMutations = {
  addImage: {
    type: ImageType,
    args: {
      secure_url: { type: GraphQLNonNull(GraphQLString) },
      public_id: { type: GraphQLNonNull(GraphQLString) },
      base64Data: { type: GraphQLNonNull(GraphQLString) },
    },
    async resolve(parent, args) {
      try {
        let imageUploaded = await cloudinary.uploader.upload(args.base64Data);
        const image = new Image({
          secure_url: imageUploaded.secure_url,
          public_id: imageUploaded.public_id,
        });
        return image.save();
      } catch (e) {
        throw e;
      }
    },
  },
  updateImage: {
    type: ImageType,
    args: {
      id: { type: GraphQLNonNull(GraphQLID) },
      secure_url: { type: GraphQLNonNull(GraphQLString) },
      public_id: { type: GraphQLNonNull(GraphQLString) },
      base64Data: { type: GraphQLNonNull(GraphQLString) },
    },
    async resolve(parent, args) {
      try {
        let imageUploaded = await cloudinary.uploader.upload(base64Data);
        return Image.findByIdAndUpdate(
          args.id,
          {
            $set: {
              secure_url: imageUploaded.secure_url,
              public_id: imageUploaded.public_id,
            },
          },
          { new: true }
        );
      } catch (e) {
        throw e;
      }
    },
  },
  deleteImage: {
    type: ImageType,
    args: {
      id: { type: GraphQLNonNull(GraphQLID) },
    },
    async resolve(parent, args) {
      try {
        let imageDocument = await Image.findById(args.id);
        await cloudinary.v2.api.delete_resources([imageDocument.public_id]);
        return Image.findByIdAndRemove(args.id);
      } catch (e) {
        throw e;
      }
    },
  },
};

module.exports = ImageMutations;
