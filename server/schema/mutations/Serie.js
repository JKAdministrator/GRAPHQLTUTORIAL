const {
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLID,
} = require("graphql");
const Serie = require("../../models/Serie");
const SerieType = require("../types/Serie");

const SerieMutations = {
  addSerie: {
    type: SerieType,
    args: {
      detail: { type: GraphQLNonNull(GraphQLString) },
      name: { type: GraphQLNonNull(GraphQLString) },
      order: { type: GraphQLNonNull(GraphQLInt) },
    },
    resolve(parent, args) {
      const serie = new Serie({
        name: args.name,
        detail: args.detail,
        order: args.order,
      });
      return serie.save();
    },
  },
  updateSerie: {
    type: SerieType,
    args: {
      id: { type: GraphQLNonNull(GraphQLID) },
      name: { type: GraphQLNonNull(GraphQLString) },
      detail: { type: GraphQLNonNull(GraphQLString) },
      order: { type: GraphQLNonNull(GraphQLInt) },
    },
    resolve(parent, args) {
      return Serie.findByIdAndUpdate(
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
  deleteSerie: {
    type: SerieType,
    args: {
      id: { type: GraphQLNonNull(GraphQLID) },
    },
    resolve(parent, args) {
      return Serie.findByIdAndRemove(args.id);
    },
  },
};

module.exports = SerieMutations;
