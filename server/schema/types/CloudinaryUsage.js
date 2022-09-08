const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLFloat,
} = require("graphql");

const CloudinaryUsageType = new GraphQLObjectType({
  name: "CloudinaryUsage",
  fields: () => ({
    plan: { type: GraphQLID },
    last_updated: { type: GraphQLString },
    transformations_usage: { type: GraphQLFloat },
    transformations_credits_usage: { type: GraphQLFloat },

    objects_usage: { type: GraphQLFloat },

    bandwidth_usage: { type: GraphQLFloat },
    bandwidth_credits_usage: { type: GraphQLFloat },

    storage_usage: { type: GraphQLFloat },
    storage_credits_usage: { type: GraphQLFloat },

    credits_usage: { type: GraphQLFloat },

    requests: { type: GraphQLFloat },
    resources: { type: GraphQLFloat },
    derived_resources: { type: GraphQLFloat },
    url2png_usage: { type: GraphQLFloat },
    url2png_limit: { type: GraphQLFloat },

    webpurify_usage: { type: GraphQLFloat },
    webpurify_limit: { type: GraphQLFloat },

    aspose_usage: { type: GraphQLFloat },
    aspose_limit: { type: GraphQLFloat },

    style_transfer_usage: { type: GraphQLFloat },
    style_transfer_limit: { type: GraphQLFloat },

    azure_video_indexer_usage: { type: GraphQLFloat },
    azure_video_indexer_limit: { type: GraphQLFloat },

    object_detection_usage: { type: GraphQLFloat },
    object_detection_limit: { type: GraphQLFloat },

    media_limits_image_max_size_bytes: { type: GraphQLFloat },
    media_limits_video_max_size_bytes: { type: GraphQLFloat },
    media_limits_raw_max_size_bytes: { type: GraphQLFloat },
    media_limits_image_max_px: { type: GraphQLFloat },
    media_limits_asset_max_total_px: { type: GraphQLFloat },
  }),
});

module.exports = CloudinaryUsageType;
