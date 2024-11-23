import { enableProdMode } from '@angular/core';
import { ENVIRONMENT } from './environments/environment';

if ( ENVIRONMENT.PRODUCTION ) {
  enableProdMode();
}

export { AppServerModule } from './app/app.module.server';
