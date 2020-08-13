import { gql } from "@apollo/client";

//Query
export const GET_USER_POSTS = gql`
  query User($email: String) {
    user(email: $email) {
      email
      posts {
        id
        content
      }
    }
  }
`;

//Mutation
export const ADD_POST = gql`
  mutation addPost($email: String, $content: String) {
    addPost(email: $email, content: $content) {
      id
    }
  }
`;

export const DELETE_POST = gql`
  mutation DELETE_POST($id: String) {
    deletePost(id: $id) {
      id
    }
  }
`;

//Subscription
export const POST_SUBSCRIPTION = gql`
  subscription POST_SUBSCRIPTION {
    newPostAdded {
      __typename
      id
      content
    }
  }
`;
