import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    Login(email: $email, password: $password)
  }
`;


export const CREATE_EMPLOYEE = gql`
mutation Mutation($name: String!, $group: String!, $subjects: [String!]!, $email: String!, $password: String!, $age: Int, $role: String) {
  createEmployee(name: $name, group: $group, subjects: $subjects, email: $email, password: $password, age: $age, role: $role) {
    age
    email
    group
    id
    name
    subjects
    role
  }
}`

export const DELETE_EMPLOYEE = gql`
mutation DeleteEmployee($deleteEmployeeId: Int!) {
  deleteEmployee(id: $deleteEmployeeId) {
    age
  }
}`

export const UPDATE_EMPLOYEE = gql`
mutation Mutation($updateEmployeeId: Int!, $name: String, $age: Int, $group: String, $subjects: [String!], $email: String, $password: String, $role: String) {
  updateEmployee(id: $updateEmployeeId, name: $name, age: $age, group: $group, subjects: $subjects, email: $email, password: $password, role: $role) {
    age
    email
    group
    id
    name
    role
    subjects
  }
}`
