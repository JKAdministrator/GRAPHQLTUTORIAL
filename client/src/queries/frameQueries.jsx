import { gql } from "@apollo/client";
const GET_FRAMES = gql`
  query getFrames {
    frames {
      id
      name
      detail
      order
      serie {
        id
        name
      }
    }
  }
`;

const GET_FRAME = gql`
  query getFrames($id: ID!) {
    frame(id: $id) {
      id
      name
      detail
      order
      serie {
        id
        name
      }
    }
  }
`;
export { GET_FRAMES, GET_FRAME };
