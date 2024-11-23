import {
	ChangeDetectionStrategy,
	Component,
	OnInit
} from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.pug',
	changeDetection	: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {

	ngOnInit(): void {
		const togtop = () =>
			document.getElementById("backtop").style.display = window.scrollY >= 800 ? "block" : "none";

		window.addEventListener("scroll", togtop);
		window.addEventListener("resize", togtop);
	}
}
