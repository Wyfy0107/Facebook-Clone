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

export const GET_ALL_POSTS = gql`
  query GET_ALL_POSTS {
    posts {
      id
      email
      content
    }
  }
`;

export const GET_LIKE = gql`
  query GET_LIKE($id: String) {
    likes(id: $id) {
      likes
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

export const UPDATE_LIKE = gql`
  mutation UPDATE_LIKE($id: String, $amount: Int) {
    updateLike(id: $id, amount: $amount) {
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
