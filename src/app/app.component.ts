import { Component } from '@angular/core';
import { APP_TEXT } from './constants';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true, // Marcar como standalone
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [CommonModule]
})
export class AppComponent {
  title = APP_TEXT.title;
  about = APP_TEXT.about;
  experience = APP_TEXT.experience;

  skills = [
    '.NET', 'C#', 'TypeScript', 'Oracle PL/SQL', 'GraphQL', 'Angular', 'JavaScript',
    'Git', 'Clean code', 'HTML', 'GitHub', 'IIS', 'CSS', 'Web Development',
    'Backend Development', 'Full-Stack Development'
  ];
  email = APP_TEXT.email;
  linkedin = APP_TEXT.linkedIn

}
