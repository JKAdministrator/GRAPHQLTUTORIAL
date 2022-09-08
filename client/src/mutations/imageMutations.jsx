import { gql } from "@apollo/client";
const ADD_IMAGE = gql`
  mutation addImage(
    $secure_url: String!
    $public_id: String!
    $base64Data: String!
  ) {
    addImage(
      secure_url: $secure_url
      public_id: $public_id
      base64Data: $base64Data
    ) {
      id
      secure_url
      public_id
    }
  }
`;
const DELETE_IMAGE = gql`
  mutation deleteImage($id: ID!) {
    deleteImage(id: $id) {
      id
      secure_url
      public_id
    }
  }
`;

export { DELETE_IMAGE, ADD_IMAGE };
