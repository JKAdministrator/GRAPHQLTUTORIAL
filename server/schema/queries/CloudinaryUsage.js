const { GraphQLID, GraphQLList, GraphQLObjectType } = require("graphql");

const cloudinary = require("cloudinary");

const CloudinaryUsageType = require("../types/CloudinaryUsage");
const CloudinaryUsageQueries = {
  usage: {
    type: CloudinaryUsageType,
    async resolve(parent, args) {
      let usageData = await cloudinary.v2.api.usage();
      let cloudinaryData = {
        plan: usageData?.plan,
        last_updated: usageData?.last_updated,
        transformations_usage: usageData?.transformations?.usage,
        transformations_credits_usage:
          usageData?.transformations?.credits_usage,
        objects_usage: usageData?.objects_usage,

        bandwidth_usage: usageData?.bandwidth?.usage,
        bandwidth_credits_usage: usageData?.bandwidth?.credits_usage,

        storage_usage: usageData?.storage?.usage,
        storage_credits_usage: usageData?.storage?.credits_usage,

        credits_usage: usageData?.credits?.usage,

        requests: usageData?.requests,
        resources: usageData?.resources,
        derived_resources: usageData?.derived_resources,
        url2png_usage: usageData?.url2png?.usage,
        url2png_limit: usageData?.url2png?.limit,

        webpurify_usage: usageData?.webpurify?.usage,
        webpurify_limit: usageData?.webpurify?.limit,

        aspose_usage: usageData?.aspose?.usage,
        aspose_limit: usageData?.aspose?.limit,

        style_transfer_usage: usageData?.style_transfer?.usage,
        style_transfer_limit: usageData?.style_transfer?.limit,

        azure_video_indexer_usage: usageData?.azure_video_indexer?.usage,
        azure_video_indexer_limit: usageData?.azure_video_indexer?.limit,

        object_detection_usage: usageData?.object_detection?.usage,
        object_detection_limit: usageData?.object_detection?.limit,

        media_limits_image_max_size_bytes:
          usageData?.media_limits?.image_max_size_bytes,
        media_limits_video_max_size_bytes:
          usageData?.media_limits?.video_max_size_bytes,
        media_limits_raw_max_size_bytes:
          usageData?.media_limits?.raw_max_size_bytes,
        media_limits_image_max_px: usageData?.media_limits?.image_max_px,
        media_limits_asset_max_total_px:
          usageData?.media_limits?.asset_max_total_px,
      };
      return cloudinaryData;
    },
  },
};

module.exports = CloudinaryUsageQueries;
