import { gql } from "@apollo/client";
const GET_EXPERIENCES = gql`
  query getExperiences {
    experiences {
      id
      detail
      year
      order
    }
  }
`;

const GET_EXPERIENCE = gql`
  query getExperiences($id: ID!) {
    experience(id: $id) {
      id
      detail
      year
      order
    }
  }
`;
export { GET_EXPERIENCES, GET_EXPERIENCE };
