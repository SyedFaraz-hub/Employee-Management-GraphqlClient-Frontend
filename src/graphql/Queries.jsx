import { gql } from '@apollo/client';

export const GET_EMPLOYEES = gql`
  query Query($page: Int!, $limit: Int!) {
    employees(page: $page, limit: $limit) {
      employees {
          age
          email
          group
          id
          name
          subjects
          role
    }
    
    total
    
    }
  }
`;
