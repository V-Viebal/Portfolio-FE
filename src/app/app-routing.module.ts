import { NgModule } from '@angular/core';
import { RouterModule, Routes, withInMemoryScrolling } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
	{
		path: '',
		component: HomeComponent,
		data: { preload: true }
	},
];

@NgModule({
	imports: [
		RouterModule.forRoot( routes, {
			initialNavigation: 'enabledBlocking',
			useHash: false,
			...withInMemoryScrolling({
				scrollPositionRestoration: 'enabled',
				anchorScrolling: 'enabled',
			}),
		}),
	],
	exports: [RouterModule]
})
export class AppRoutingModule { }
