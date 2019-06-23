import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { FilterModalComponent } from './filter-modal/filter-modal';
import { DetailsModalComponent } from './details-modal/details-modal';
@NgModule({
	declarations: [
		FilterModalComponent,
		DetailsModalComponent
	],
	entryComponents: [
		FilterModalComponent,
		DetailsModalComponent
	],
	imports: [
		IonicModule.forRoot(FilterModalComponent)
	],
	exports: [
		FilterModalComponent,
		DetailsModalComponent
	]
})
export class ComponentsModule { }
