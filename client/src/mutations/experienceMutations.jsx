import { gql } from "@apollo/client";
const ADD_EXPERIENCE = gql`
  mutation addExperience($detail: String!, $year: String!, $order: Int!) {
    addExperience(detail: $detail, year: $year, order: $order) {
      id
      detail
      year
      order
    }
  }
`;
const UPDATE_EXPERIENCE = gql`
  mutation updateExperience(
    $id: ID!
    $detail: String!
    $year: String!
    $order: Int!
  ) {
    updateExperience(id: $id, detail: $detail, year: $year, order: $order) {
      id
      detail
      year
      order
    }
  }
`;
const DELETE_EXPERIENCE = gql`
  mutation deleteExperience($id: ID!) {
    deleteExperience(id: $id) {
      id
      detail
      year
      order
    }
  }
`;

export { DELETE_EXPERIENCE, ADD_EXPERIENCE, UPDATE_EXPERIENCE };
