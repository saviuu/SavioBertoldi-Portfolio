import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { APP_TEXT } from './constants';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Importa o CSS do AOS
import { CommonModule } from '@angular/common';

import { ParticlesOptions } from './particles/particles.config';
import { Container, Engine } from 'tsparticles-engine';
import { loadSlim } from 'tsparticles-slim';
import { ProjectService } from './services/project.service';
import { ProjectModel } from './models/Project.model';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('flyInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        style({ transform: 'translateX(-100%)' }),
        animate(200)
      ]),
      transition('* => void', [
        animate(200, style({ transform: 'translateX(100%)' }))
      ])
    ])
  ]
})
export class AppComponent implements OnInit {
  title = APP_TEXT.title;
  about = APP_TEXT.about;
  experience = APP_TEXT.experience;
  skills = APP_TEXT.skills;
  email = APP_TEXT.email;
  linkedin = APP_TEXT.linkedIn;
  instagram = APP_TEXT.instagram;

  id = "tsparticles";

  projects: ProjectModel[] = [];
  errorMessage: string | null = null;
  isNavigationBoxVisible = true;

  particlesOptions = ParticlesOptions;

  isLoaded = false;

  // Estado das seções
  sectionVisibility: { [key: string]: boolean } = {
    about: true,
    experience: true,
    skills: true,
    contact: true
  };

  sections = [
    { id: 'about', name: 'Sobre Mim' },
    { id: 'experience', name: 'Experiência' },
    { id: 'skills', name: 'Habilidades' },
    { id: 'projects', name: 'Projetos' },
    { id: 'contact', name: 'Contato' }
  ];

  constructor(private _projectService: ProjectService, private _changeDetector: ChangeDetectorRef){}

  async ngOnInit() {
    AOS.init(); // Inicializa o AOS

    await this.loadProjects();
    console.log(this.projects);
    console.log(this.isLoaded);
  }

  async loadProjects() {
    try {
      this.projects = await lastValueFrom(this._projectService.getProjects());
      console.log(this.projects);
    } catch (error) {
      console.error(error);
    }

    this.isLoaded = true;
    this._changeDetector.detectChanges(); // Força a detecção de mudanças
  }

  toggleNavigationBox() {
    if(this.isNavigationBoxVisible) {
      this.isNavigationBoxVisible = false;
    } else {
      this.isNavigationBoxVisible= true;
    }
  }

  toggleSection(section: string) {
    const currentState = this.isSectionVisible(section);
    this.sectionVisibility[section] = !currentState;

    const sectionContent = document.querySelector(`.${section} .section-content`);

    if (sectionContent) {
      // Alterna a classe entre 'hidden' e 'show'
      sectionContent.classList.toggle('show', !currentState);
      sectionContent.classList.toggle('hidden', currentState);
    }
  }

  isSectionVisible(section: string): boolean {
    return this.sectionVisibility[section] || false;
  }

  particlesLoaded(container: Container): void {
    console.log(container);
  }

  async particlesInit(engine: Engine): Promise<void> {
    console.log(engine);
    await loadSlim(engine, true);
  }

  scrollToSection(section: string) {
    // Verifica se a seção está oculta e a torna visível
    if (!this.isSectionVisible(section)) {
      this.toggleSection(section);
      // Aguarda um pequeno tempo para a animação de abertura antes de rolar
      setTimeout(() => {
        const element = document.querySelector(`.${section}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300); // Ajuste o tempo se necessário
    } else {
      // Se a seção já estiver visível, apenas rola até ela
      const element = document.querySelector(`.${section}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }

    this.isNavigationBoxVisible = false;
  }

  // Método para garantir que o valor seja sempre uma matriz
  ensureArray(value: string | string[]): string[] {
    return Array.isArray(value) ? value : [value];
  }

  openLink(url: string) {
    window.open(url, '_blank');
  }
}
