export class ProjectModel {
  id: number;
  name: string;
  description: string;
  url?: string; // Campo opcional
  tags?: string[]; // Campo opcional

   // Propriedades para armazenar traduções
   translatedName?: string;
   translatedDescription?: string;

  constructor(id: number, name: string, description: string, url?: string, tags?: string[]) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.url = url;
    this.tags = tags;
  }
}
