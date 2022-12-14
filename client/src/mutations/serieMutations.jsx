import { gql } from "@apollo/client";
const ADD_SERIE = gql`
  mutation addSerie($detail: String!, $name: String!, $order: Int!) {
    addSerie(detail: $detail, name: $name, order: $order) {
      id
      detail
      name
      order
    }
  }
`;
const UPDATE_SERIE = gql`
  mutation updateSerie(
    $id: ID!
    $detail: String!
    $name: String!
    $order: Int!
  ) {
    updateSerie(id: $id, detail: $detail, name: $name, order: $order) {
      id
      detail
      name
      order
    }
  }
`;
const DELETE_SERIE = gql`
  mutation deleteSerie($id: ID!) {
    deleteSerie(id: $id) {
      id
      detail
      name
      order
    }
  }
`;

export { DELETE_SERIE, ADD_SERIE, UPDATE_SERIE };
