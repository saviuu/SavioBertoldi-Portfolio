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
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { GithubService } from './services/git-hub.service';

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

  id = "tsparticles";
  particlesOptions = ParticlesOptions;

  isLoading = false;
  isLayoutExpanded = false;
  isNavigationBoxVisible = true;
  isDesktopOrLaptop: boolean = false;

  linkedin: string = '';
  instagram: string = '';
  email: string = '';

  currentLanguage: string = 'pt'; // Define o idioma padrão como português
  cvUrl: string = 'assets/documents/cvPT.pdf'; // URL padrão

  experienceItems: any[] = [];
  skillsItems: string[] = [];
  recentActivities: any[] = [];

  projectTranslatedName: string = '';
  projectTranslatedDescription: string = '';

  currentTextIndex = 1; // Começa com o índice 1
  currentPhraseKey = 'phrases.phrase1'; // Inicialmente exibe a primeira frase

  sectionVisibility: { [key: string]: boolean } = {
    about: true,
    experience: true,
    skills: true,
    contact: true,
    github: true
  };

  constructor(
    private translate: TranslateService,
    private _graphQLService: GraphQLService,
    private githubService: GithubService,
    private eRef: ElementRef, // Adiciona referência ao elemento
    private breakpointObserver: BreakpointObserver
  ) {
    this.translate.setDefaultLang(this.currentLanguage);  // Define o idioma padrão aqui
  }

  async ngOnInit() {
    this._breakpointObserver();

    this._getRecentActivities();

    AOS.init();
    this.switchLanguage(this.currentLanguage);  // Inicializa com o idioma padrão
    //this.startCarousel();
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

// Método para alternar as frases
// startCarousel() {
//   setInterval(() => {
//     this.currentTextIndex = (this.currentTextIndex % 3) + 1; // Alterna entre 1, 2 e 3
//     this.updatePhraseKey(); // Atualiza a chave da frase
//   }, 5000); // Muda o texto a cada 3 segundos
// }

  // Método para atualizar a chave da frase com base no índice
  updatePhraseKey() {
    this.currentPhraseKey = `phrases.phrase${this.currentTextIndex}`;
  }



  switchLanguage(language: string) {
    this.isLoading = true; // Exibe a tela de splash
    this.currentLanguage = language;

    this.translate.use(language).subscribe({
      next: () => {
        this.loadTranslations();  // Recarrega as traduções quando o idioma é trocado
        this.loadProjectTranslations();
        this.updateCvUrl(language);
        setTimeout(() => {
          this.isLoading = false; // Oculta a tela de splash após o carregamento
        }, 1000); // Atraso para garantir que o usuário veja o splash por um breve momento
      },
      error: () => {
        this.isLoading = false; // Oculta a tela de splash em caso de erro
      }
    });
  }

  updateCvUrl(lang: string) {
    if (lang === 'en') {
      this.cvUrl = 'assets/documents/englishCV/cvEN.pdf';
    } else {
      this.cvUrl = 'assets/documents/portugueseCV/cvPT.pdf';
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

  async loadProjects() {
    this._graphQLService.query<{ get_projects: ProjectModel[] }>(GET_ALL).subscribe({
      next: (response) => {
        this.projects = response?.get_projects || [];
        this.loadProjectTranslations(); // Carrega as traduções dos projetos após obtê-los

        this.toggleSection('projects');
      },
      error: (error) => {
        console.error('Error fetching projects:', error);
      }
    });
  }

  loadProjectTranslations() {
    this.projects = this.projects.map(project => {
      let updatedProject = { ...project };

      this.translate.get(`projects.${project.id}.name`).subscribe((translatedName: string) => {
        console.log(translatedName);
        updatedProject.name = translatedName;
      });

      this.translate.get(`projects.${project.id}.description`).subscribe((translatedDescription: string) => {
        console.log(translatedDescription);
        updatedProject.description = translatedDescription;
      });

      return updatedProject;
    });
  }


  toggleLayout() {
    this.isLayoutExpanded = !this.isLayoutExpanded;
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

  private _getRecentActivities(){
    this.githubService.getRecentActivities().subscribe((data: any[]) => {
      this.recentActivities = data.slice(0, 5); // Exibe as 5 atividades mais recentes
    });
  }

  private _breakpointObserver(){
    this.breakpointObserver.observe([Breakpoints.Web, Breakpoints.WebLandscape])
      .subscribe(result => {
        this.isDesktopOrLaptop = result.matches;
      });
  }
}
