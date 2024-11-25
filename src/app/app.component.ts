import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	Inject,
	PLATFORM_ID
} from '@angular/core';
import {
	isPlatformBrowser
} from '@angular/common';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.pug',
	changeDetection	: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements AfterViewInit {

	constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

	ngAfterViewInit(): void {
		if ( isPlatformBrowser( this.platformId ) ) {
			const togtop = () =>
				document.getElementById('backtop').style.display
					= window.scrollY >= 800 ? 'block' : 'none';

			window.addEventListener('scroll', togtop);
			window.addEventListener('resize', togtop);
		}
	}
}
