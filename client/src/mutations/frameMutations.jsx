import { gql } from "@apollo/client";
const ADD_FRAME = gql`
  mutation addFrame(
    $name: String!
    $detail: String!
    $order: Int!
    $serieId: ID!
    $images: [String]!
  ) {
    addFrame(
      name: $name
      detail: $detail
      order: $order
      serieId: $serieId
      images: $images
    ) {
      id
      name
      detail
      order
      images {
        id
        public_id
        secure_url
      }
      serie {
        id
        name
        detail
        order
      }
    }
  }
`;

const UPDATE_FRAME = gql`
  mutation updateFrame(
    $id: ID!
    $name: String!
    $detail: String!
    $order: Int!
    $serieId: ID!
    $images: [String]!
  ) {
    updateFrame(
      id: $id
      name: $name
      detail: $detail
      order: $order
      serieId: $serieId
      images: $images
    ) {
      id
      name
      detail
      order
      images {
        id
        public_id
        secure_url
      }
      serie {
        id
        name
        detail
        order
      }
    }
  }
`;
const DELETE_FRAME = gql`
  mutation deleteFrame($id: ID!) {
    deleteFrame(id: $id) {
      id
      name
      detail
      order
      images {
        id
        public_id
        secure_url
      }
      serie {
        id
        name
        detail
        order
      }
    }
  }
`;

export { DELETE_FRAME, ADD_FRAME, UPDATE_FRAME };
