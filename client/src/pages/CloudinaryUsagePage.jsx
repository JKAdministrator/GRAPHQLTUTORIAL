import { useQuery } from "@apollo/client";
import { useState } from "react";
import Spinner from "../components/Spinner";

import { GET_USAGE } from "../queries/CloudinaryUsage";
export default function CloudinaryUsagePage() {
  const { loading, error, data } = useQuery(GET_USAGE);

  if (loading) return <Spinner />;
  if (error) return <p>Something went wrong</p>;
  return (
    <div className="container-fluid p-2 mt-1">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>DATA</th>
            <th>VALUE</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          <tr>
            <td>Plan</td>
            <td>{data?.usage?.plan}</td>
          </tr>
          <tr>
            <td>Last updated</td>
            <td>{data?.usage?.last_updated}</td>
          </tr>
          <tr>
            <td>Transformation usage</td>
            <td>
              {data?.usage?.transformations_usage} (
              {data?.usage?.transformations_credits_usage} credits)
            </td>
          </tr>
          <tr>
            <td>Objects usage</td>
            <td>
              {data?.usage?.objects_usage ? data?.usage?.objects_usage : "0"}
            </td>
          </tr>
          <tr>
            <td>Bandwidth usage</td>
            <td>
              {data?.usage?.bandwidth_usage
                ? `${data?.usage?.bandwidth_usage} ( ${data?.usage?.bandwidth_credits_usage} credits)`
                : "0"}
            </td>
          </tr>
          <tr>
            <td>Storage usage</td>
            <td>
              {data?.usage?.storage_usage
                ? `${data?.usage?.storage_credits_usage}`
                : "0"}{" "}
              credits
            </td>
          </tr>
          <tr>
            <td>Credits usage</td>
            <td>
              {data?.usage?.credits_usage
                ? `${data?.usage?.credits_usage}`
                : "0"}{" "}
              credits
            </td>
          </tr>
          <tr>
            <td>Requests</td>
            <td>{data?.usage?.requests ? data?.usage?.requests : 0}</td>
          </tr>
          <tr>
            <td>Resources</td>
            <td>{data?.usage?.resources ? data?.usage?.resources : "0"}</td>
          </tr>
          <tr>
            <td>Derived Resources</td>
            <td>
              {data?.usage?.derived_resources
                ? data?.usage?.derived_resources
                : 0}
            </td>
          </tr>
          <tr>
            <td>Url2png usage</td>
            <td>
              {data?.usage?.url2png_usage
                ? `${data?.usage?.url2png_usage} of ${data?.usage?.url2png_limit}`
                : "0"}
            </td>
          </tr>
          <tr>
            <td>webpurify usage</td>
            <td>
              {data?.usage?.webpurify_usage
                ? `${data?.webpurify_usage} of ${data?.usage?.webpurify_limit}`
                : "0"}
            </td>
          </tr>
          <tr>
            <td>Aspose usage</td>
            <td>
              {data?.usage?.aspose_usage
                ? `${data?.aspose_usage} of ${data?.usage?.aspose_limit}`
                : "0"}
            </td>
          </tr>
          <tr>
            <td>Style transfer usage</td>
            <td>
              {data?.usage?.style_transfer_usage
                ? `${data?.style_transfer_usage} of ${data?.usage?.style_transfer_limit}`
                : "0"}
            </td>
          </tr>
          <tr>
            <td>Azure video indexer usage</td>
            <td>
              {data?.usage?.azure_video_indexer_usage
                ? `${data?.usage?.azure_video_indexer_usage} of ${data?.usage?.azure_video_indexer_limit}`
                : "0"}
            </td>
          </tr>
          <tr>
            <td>Object detection usage</td>
            <td>
              {data?.usage.object_detection_usage
                ? `${data?.object_detection_usage} of ${data?.usage?.object_detection_limit}`
                : "0"}
            </td>
          </tr>
          <tr>
            <td>Image max size </td>
            <td>
              {data?.usage?.media_limits_image_max_size_bytes
                ? `${data?.usage?.media_limits_image_max_size_bytes} bytes or ${data?.usage?.media_limits_image_max_px} px`
                : "0"}
            </td>
          </tr>
          <tr>
            <td>Image max total pixels </td>
            <td>{data?.usage?.media_limits_asset_max_total_px} px</td>
          </tr>
          <tr>
            <td>Video max size </td>
            <td>{data?.usage?.media_limits_video_max_size_bytes} bytes</td>
          </tr>
          <tr>
            <td>Raw max size </td>
            <td>{data?.usage?.media_limits_raw_max_size_bytes} bytes</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
