import { gql } from "@apollo/client";
const GET_USAGE = gql`
  query usage {
    usage {
      plan
      last_updated
      transformations_usage
      transformations_credits_usage
      objects_usage
      bandwidth_usage
      bandwidth_credits_usage
      storage_usage
      storage_credits_usage
      credits_usage
      requests
      resources
      derived_resources
      url2png_usage
      url2png_limit
      webpurify_usage
      webpurify_limit
      aspose_usage
      aspose_limit
      style_transfer_usage
      style_transfer_limit
      azure_video_indexer_usage
      azure_video_indexer_limit
      object_detection_usage
      object_detection_limit
      media_limits_image_max_size_bytes
      media_limits_video_max_size_bytes
      media_limits_raw_max_size_bytes
      media_limits_image_max_px
      media_limits_asset_max_total_px
    }
  }
`;

export { GET_USAGE };
