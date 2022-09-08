const { GraphQLSchema, GraphQLObjectType } = require("graphql");

const ExperienceQueries = require("./queries/Experience");
const FrameQueries = require("./queries/Frame");
const SerieQueries = require("./queries/Serie");
const SerieMutations = require("./mutations/Serie");
const ImageQueries = require("./queries/Image");
const ImageMutations = require("./mutations/Image");
const FrameMutations = require("./mutations/Frame");
const ExperienceMutations = require("./mutations/Experience");
const CloudinaryUsageQueries = require("./queries/CloudinaryUsage");

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
      ...ExperienceQueries,
      ...FrameQueries,
      ...SerieQueries,
      ...ImageQueries,
      ...CloudinaryUsageQueries,
    },
  }),
  mutation: new GraphQLObjectType({
    name: "Mutation",
    fields: {
      ...ExperienceMutations,
      ...SerieMutations,
      ...FrameMutations,
      ...ImageMutations,
    },
  }),
});
