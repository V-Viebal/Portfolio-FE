import {
	ChangeDetectionStrategy,
	Component
} from '@angular/core';
import _ from 'lodash';

@Component({
	selector: 'home',
	templateUrl: './home.pug',
	styleUrls: ['./home.component.scss'],
	changeDetection	: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
}
