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
      serie {
        id
        name
        detail
        order
      }
    }
  }
`;

export { DELETE_FRAME, ADD_FRAME };
