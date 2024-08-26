import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { ProjectModel } from '../models/Project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = 'https://localhost:7046/api/Projects/GetProjects';

  //Controller usado anteriormente para buscar os projetos na API.
  /** Será usado futuramente para outros fins, já que atualmente as pesquisas são feitas com GraphQL. */

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  getProjects(): Observable<ProjectModel[]> {
    return this.http.get<ProjectModel[]>(this.apiUrl).pipe(
      catchError(error => this.handleError(error))
    );
  }

  getProject(id: number): Observable<ProjectModel> {
    return this.http.get<ProjectModel>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => this.handleError(error))
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('Ocorreu um erro:', error);
    this.toastr.error('Algo de errado aconteceu, por favor tente novamente mais tarde.', 'Error');
    return throwError(() => new Error('Algo de errado aconteceu, por favor tente novamente mais tarde.'));
  }
}
