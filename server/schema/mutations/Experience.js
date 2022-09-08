const {
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLID,
} = require("graphql");
const Experience = require("../../models/Experience");
const ExperienceType = require("../types/Experience");

const ExperienceMutations = {
  addExperience: {
    type: ExperienceType,
    args: {
      detail: { type: GraphQLNonNull(GraphQLString) },
      year: { type: GraphQLNonNull(GraphQLString) },
      order: { type: GraphQLNonNull(GraphQLInt) },
    },
    resolve(parent, args) {
      const experience = new Experience({
        year: args.year,
        detail: args.detail,
        order: args.order,
      });
      return experience.save();
    },
  },
  updateExperience: {
    type: ExperienceType,
    args: {
      id: { type: GraphQLNonNull(GraphQLID) },
      detail: { type: GraphQLNonNull(GraphQLString) },
      year: { type: GraphQLNonNull(GraphQLString) },
      order: { type: GraphQLNonNull(GraphQLInt) },
    },
    resolve(parent, args) {
      return Experience.findByIdAndUpdate(
        args.id,
        {
          $set: {
            detail: args.detail,
            year: args.year,
            order: args.order,
          },
        },
        { new: true }
      );
    },
  },
  deleteExperience: {
    type: ExperienceType,
    args: {
      id: { type: GraphQLNonNull(GraphQLID) },
    },
    resolve(parent, args) {
      return Experience.findByIdAndRemove(args.id);
    },
  },
};

module.exports = ExperienceMutations;
