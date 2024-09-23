import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private apiUrl = `https://api.github.com/users/saviuu/events`;

  constructor(private http: HttpClient) {}

  getRecentActivities(): Observable<any> {
    const headers = new HttpHeaders({
       Authorization: `Bearer ${environment.githubToken}`
    });

    return this.http.get(this.apiUrl, { headers });
  }
}
