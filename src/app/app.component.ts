import { Component, OnInit } from '@angular/core';
import { APP_TEXT } from './constants';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Importa o CSS do AOS
import { CommonModule } from '@angular/common';

import { NgParticlesModule } from 'ng-particles';
import { ParticlesOptions } from './particles/particles.config';
import { Container, Engine } from 'tsparticles-engine';
import { loadSlim } from 'tsparticles-slim';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [CommonModule, NgParticlesModule]
})
export class AppComponent implements OnInit {
  title = APP_TEXT.title;
  about = APP_TEXT.about;
  experience = APP_TEXT.experience;
  skills = APP_TEXT.skills;
  email = APP_TEXT.email;
  linkedin = APP_TEXT.linkedIn;

  id = "tsparticles";

  particlesOptions = ParticlesOptions;

  // Estado das seções
  sectionVisibility: { [key: string]: boolean } = {
    about: true,
    experience: true,
    skills: true,
    contact: true
  };

  ngOnInit() {
    AOS.init(); // Inicializa o AOS
  }

  toggleSection(section: string): void {
    if (this.sectionVisibility.hasOwnProperty(section)) {
      this.sectionVisibility[section] = !this.sectionVisibility[section];
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
}
