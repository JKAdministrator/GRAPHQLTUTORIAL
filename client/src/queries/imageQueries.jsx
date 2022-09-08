import { gql } from "@apollo/client";
const GET_IMAGES = gql`
  query getImages {
    images {
      id
      public_id
      secure_url
    }
  }
`;

const GET_IMAGE = gql`
  query getImages($id: ID!) {
    image(id: $id) {
      id
      public_id
      secure_url
    }
  }
`;
export { GET_IMAGES, GET_IMAGE };
