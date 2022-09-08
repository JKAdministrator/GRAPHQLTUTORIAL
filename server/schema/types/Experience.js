const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
} = require("graphql");

const ExperienceType = new GraphQLObjectType({
  name: "Experience",
  fields: () => ({
    id: { type: GraphQLID },
    detail: { type: GraphQLString },
    year: { type: GraphQLString },
    order: { type: GraphQLString },
  }),
});

module.exports = ExperienceType;
