import { gql } from "@apollo/client";
const GET_SERIES = gql`
  query getSeries {
    series {
      id
      name
      detail
      order
    }
  }
`;

const GET_SERIE = gql`
  query getSeries($id: ID!) {
    serie(id: $id) {
      id
      name
      detail
      order
    }
  }
`;
export { GET_SERIES, GET_SERIE };
