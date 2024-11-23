import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { CommonModule } from '@angular/common';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { provideHttpClient, withFetch } from '@angular/common/http';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    CommonModule,
  ],
  providers: [
    provideHttpClient(withFetch()),
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}

export default AppServerModule;
