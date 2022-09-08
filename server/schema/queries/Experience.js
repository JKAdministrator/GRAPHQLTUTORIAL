// Mongoose models
const Experience = require("../../models/Experience");
const ExperienceType = require("../types/Experience");

const { GraphQLID, GraphQLList } = require("graphql");

const ExperienceQuery = {
  experience: {
    type: ExperienceType,
    args: { id: { type: GraphQLID } },
    resolve(parent, args) {
      return Experience.findById(args.id);
    },
  },
  experiences: {
    type: new GraphQLList(ExperienceType),
    resolve(parent, args) {
      return Experience.find();
    },
  },
};

module.exports = ExperienceQuery;
