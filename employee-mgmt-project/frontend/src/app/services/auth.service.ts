import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private apollo: Apollo, private router: Router) {}

  signup(username: string, email: string, password: string) {
    const SIGNUP_MUTATION = gql`
      mutation Signup($username: String!, $email: String!, $password: String!) {
        Signup(username: $username, email: $email, password: $password) {
          token
          username
          email
        }
      }
    `;
    return this.apollo.mutate({
      mutation: SIGNUP_MUTATION,
      variables: { username, email, password },
      fetchPolicy: 'no-cache'
    });
  }

  login(email: string, password: string) {
    const LOGIN_QUERY = gql`
      query Login($email: String!, $password: String!) {
        Login(email: $email, password: $password) {
          token
          username
          email
        }
      }
    `;
    return this.apollo.query({
      query: LOGIN_QUERY,
      variables: { email, password },
      fetchPolicy: 'no-cache'
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
