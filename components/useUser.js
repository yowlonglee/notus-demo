import { gql, useQuery } from '@apollo/client';

export const CURRENT_USER_QUERY = gql`
  query {
    authenticatedItem {
      ... on User {
        id
        email
        name
        avatar {
          id
          image {
            publicUrlTransformed
          }
          name
        }
      }
    }
  }
`;

export function useUser() {
  const { data, loading } = useQuery(CURRENT_USER_QUERY);
  // return data?.authenticatedItem;
  return { data, loading };
}
