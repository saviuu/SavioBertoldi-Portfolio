import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgParticlesModule } from 'ng-particles';
import { ToastrModule } from 'ngx-toastr';
import { ProjectService } from './services/project.service';
import { ApolloModule } from 'apollo-angular';
import { graphqlProvider } from './graphql.provider';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    NgParticlesModule,
    ApolloModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [ProjectService, graphqlProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
