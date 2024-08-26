import { Injectable } from '@angular/core';
import { MutationOptions, QueryOptions } from '@apollo/client';
import { Apollo } from 'apollo-angular';
import { gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { QueryResponse } from '../query/query-response';

@Injectable({
  providedIn: 'root'
})
export class GraphQLService {
  constructor(private apollo: Apollo) {}

// Método genérico para executar uma consulta (query)
query<T>(query: string, variables?: { [key: string]: any }): Observable<T> {
  const options: QueryOptions = {
    query: gql`${query}`,
    variables: variables || {}
  };

  return this.apollo.query<T>(options).pipe(
    map(result => result.data) // Mapeando para acessar o campo 'data'
  );
}


  // Método genérico para executar uma mutação (mutation)
  mutate<T>(mutation: string, variables?: { [key: string]: any }): Observable<T> {
    const options: MutationOptions = {
      mutation: gql`${mutation}`,
      variables: variables || {}
    };

    return this.apollo.mutate<T>(options).pipe(
      map(result => {
        if (result.data === null || result.data === undefined) {
          throw new Error('No data returned from GraphQL mutation');
        }
        return result.data;
      })
    );
  }

}
