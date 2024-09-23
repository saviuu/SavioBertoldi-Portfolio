import { TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

export class MultiTranslateHttpLoader implements TranslateLoader {
  constructor(private http: HttpClient, public resources: { prefix: string, suffix: string }[]) {}

  getTranslation(lang: string): Observable<any> {
    return forkJoin(
      this.resources.map(config => this.http.get(`${config.prefix}${lang}${config.suffix}`))
    ).pipe(
      mergeMap((response: Object[]) => {
        const translationObject = {};
        response.forEach(res => Object.assign(translationObject, res));
        return [translationObject];
      })
    );
  }
}

export function createTranslateLoader(http: HttpClient) {
  return new MultiTranslateHttpLoader(http, [
    { prefix: './assets/i18n/animated-phrases-', suffix: '.json' },
    { prefix: './assets/i18n/projects-', suffix: '.json' },
    { prefix: './assets/i18n/snake-game-', suffix: '.json' },
    { prefix: './assets/i18n/', suffix: '.json' } // O arquivo principal para outras traduções
  ]);
}
