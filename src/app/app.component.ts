import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import AOS from 'aos';
import { GraphQLService } from './graphql/services/graphql.service';
import { ProjectModel } from './models/Project.model';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ParticlesOptions } from './particles/particles.config';
import { Container, Engine } from 'tsparticles-engine';
import { loadSlim } from 'tsparticles-slim';
import { GET_ALL } from './constants';

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
  projects: ProjectModel[] = [];
  isNavigationBoxVisible = true;
  id = "tsparticles";
  particlesOptions = ParticlesOptions;
  isLoading = false;

  linkedin: string = '';
  instagram: string = '';
  email: string = '';

  currentLanguage: string = 'pt'; // Define o idioma padrão como português

  experienceItems: any[] = [];
  skillsItems: string[] = [];

  sectionVisibility: { [key: string]: boolean } = {
    about: true,
    experience: true,
    skills: true,
    contact: true
  };

  constructor(
    private translate: TranslateService,
    private _graphQLService: GraphQLService,
    private eRef: ElementRef // Adiciona referência ao elemento
  ) {
    this.translate.setDefaultLang(this.currentLanguage);  // Define o idioma padrão aqui
  }

  async ngOnInit() {
    AOS.init();
    this.switchLanguage('pt');  // Inicializa com o idioma padrão
    await this.loadProjects();
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;

    // Verifica se o clique ocorreu fora da navigation-box e não é o botão de alternância
    if (this.isNavigationBoxVisible && targetElement && !this.eRef.nativeElement.querySelector('.navigation-box').contains(targetElement) && !this.eRef.nativeElement.querySelector('.toggle-navigation-box').contains(targetElement)) {
      this.isNavigationBoxVisible = false;
    }
  }

  loadTranslations() {
    this.translate.get('experience').subscribe((experience: any[]) => {
      if (experience && Array.isArray(experience)) {
        this.experienceItems = experience.map(job => ({
          position: job.position,
          company: job.company,
          period: job.period,
          description: job.description
        }));
      }
    });

    this.translate.get('skills').subscribe((skills: string[]) => {
      if (skills && Array.isArray(skills)) {
        this.skillsItems = skills;
      }
    });

    this.translate.get('linkedIn').subscribe((url: string) => {
      this.linkedin = url;
    });

    this.translate.get('instagram').subscribe((url: string) => {
      this.instagram = url;
    });

    this.translate.get('email').subscribe((email: string) => {
      this.email = email;
    });
  }

  switchLanguage(language: string) {
    this.isLoading = true; // Exibe a tela de splash
    this.currentLanguage = language;

    this.translate.use(language).subscribe({
      next: () => {
        this.loadTranslations();  // Recarrega as traduções quando o idioma é trocado
        setTimeout(() => {
          this.isLoading = false; // Oculta a tela de splash após o carregamento
        }, 1000); // Atraso para garantir que o usuário veja o splash por um breve momento
      },
      error: () => {
        this.isLoading = false; // Oculta a tela de splash em caso de erro
      }
    });
  }

  async loadProjects() {
    this._graphQLService.query<{ get_projects: ProjectModel[] }>(GET_ALL).subscribe({
      next: (response) => {
        this.projects = response?.get_projects || [];
        this.loadProjectTranslations(); // Carrega as traduções dos projetos após obtê-los
      },
      error: (error) => {
        console.error('Error fetching projects:', error);
      }
    });
  }

  loadProjectTranslations() {
    this.projects.forEach(project => {
      this.translate.get(`projects.${project.id}.name`).subscribe((translatedName: string) => {
        project.name = translatedName;
      });
      this.translate.get(`projects.${project.id}.description`).subscribe((translatedDescription: string) => {
        project.description = translatedDescription;
      });
    });
  }

  toggleNavigationBox() {
    this.isNavigationBoxVisible = !this.isNavigationBoxVisible;
  }

  toggleSection(section: string) {
    const currentState = this.isSectionVisible(section);
    this.sectionVisibility[section] = !currentState;
  }

  isSectionVisible(section: string): boolean {
    return this.sectionVisibility[section] || false;
  }

  async particlesInit(engine: Engine): Promise<void> {
    await loadSlim(engine, true);
  }

  scrollToSection(section: string) {
    if (!this.isSectionVisible(section)) {
      this.toggleSection(section);
      setTimeout(() => {
        const element = document.querySelector(`.${section}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 350);
    } else {
      const element = document.querySelector(`.${section}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }

    this.isNavigationBoxVisible = false;
  }

  ensureArray(value: string | string[]): string[] {
    return Array.isArray(value) ? value : [value];
  }

  openLink(url: string) {
    window.open(url, '_blank');
  }
}
