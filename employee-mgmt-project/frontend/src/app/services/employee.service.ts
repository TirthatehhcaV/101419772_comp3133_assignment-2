// src/app/services/employee.service.ts
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { gql } from 'apollo-angular';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  constructor(private apollo: Apollo) {}

  getAllEmployees() {
    const GET_ALL = gql`
      query {
        getAllEmployees {
          id
          first_name
          last_name
          email
          gender
          designation
          salary
          date_of_joining
          department
          employee_photo
        }
      }
    `;
    return this.apollo.watchQuery({ query: GET_ALL }).valueChanges.pipe(
      map((res: any) => res.data.getAllEmployees)
    );
  }

  getEmployeeById(id: string) {
    const GET_ONE = gql`
      query ($id: String!) {
        getEmployeeByID(id: $id) {
          id
          first_name
          last_name
          email
          gender
          designation
          salary
          date_of_joining
          department
          employee_photo
        }
      }
    `;
    return this.apollo.query({
      query: GET_ONE,
      variables: { id }
    }).pipe(map((res: any) => res.data.getEmployeeByID));
  }

  addEmployee(emp: any) {
    const ADD = gql`
      mutation AddEmployee(
        $first_name: String!,
        $last_name: String!,
        $email: String!,
        $gender: String!,
        $designation: String!,
        $salary: Float!,
        $date_of_joining: String!,
        $department: String!,
        $employee_photo: String!
      ) {
        AddEmployee(
          first_name: $first_name,
          last_name: $last_name,
          email: $email,
          gender: $gender,
          designation: $designation,
          salary: $salary,
          date_of_joining: $date_of_joining,
          department: $department,
          employee_photo: $employee_photo
        ) {
          id
          first_name
        }
      }
    `;
    return this.apollo.mutate({ mutation: ADD, variables: emp });
  }

  updateEmployee(emp: any) {
    const UPDATE = gql`
      mutation UpdateEmployee(
        $id: ID!,
        $first_name: String,
        $last_name: String,
        $email: String,
        $gender: String,
        $designation: String,
        $salary: Float,
        $date_of_joining: String,
        $department: String,
        $employee_photo: String
      ) {
        UpdateEmployee(
          id: $id,
          first_name: $first_name,
          last_name: $last_name,
          email: $email,
          gender: $gender,
          designation: $designation,
          salary: $salary,
          date_of_joining: $date_of_joining,
          department: $department,
          employee_photo: $employee_photo
        ) {
          id
          first_name
        }
      }
    `;
    return this.apollo.mutate({ mutation: UPDATE, variables: emp });
  }

  deleteEmployee(id: string) {
    const DELETE = gql`
      mutation DeleteEmployee($id: ID!) {
        DeleteEmployee(id: $id) {
          id
        }
      }
    `;
    return this.apollo.mutate({ mutation: DELETE, variables: { id } });
  }

  
  searchEmployee(criteria: { designation?: string; department?: string }) {
    const SEARCH = gql`
      query ($designation: String, $department: String) {
        searchEmployees(designation: $designation, department: $department) {
          id
          first_name
          last_name
          designation
          department
        }
      }
    `;
    return this.apollo.query({
      query: SEARCH,
      variables: criteria
    }).pipe(map((res: any) => res.data.searchEmployees));
  }
}
