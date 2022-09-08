const Serie = require("../../models/Serie");
const SerieType = require("../types/Serie");

const { GraphQLID, GraphQLList } = require("graphql");

const SerieQueries = {
  series: {
    type: new GraphQLList(SerieType),
    resolve(parent, args) {
      return Serie.find();
    },
  },
  serie: {
    type: SerieType,
    args: { id: { type: GraphQLID } },
    resolve(parent, args) {
      return Serie.findById(args.id);
    },
  },
};

module.exports = SerieQueries;
