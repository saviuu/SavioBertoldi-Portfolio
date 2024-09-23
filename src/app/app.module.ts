import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgParticlesModule } from 'ng-particles';
import { ToastrModule } from 'ngx-toastr';
import { ProjectService } from './services/project.service';
import { ApolloModule } from 'apollo-angular';
import { graphqlProvider } from './graphql.provider';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { createTranslateLoader } from './shared/translation/multi-translate-http-loader';
import { SnakeGameComponent } from './snake-game/snake-game.component';


@NgModule({
  declarations: [
    AppComponent,
    SnakeGameComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    NgParticlesModule,
    ApolloModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [ProjectService, graphqlProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
