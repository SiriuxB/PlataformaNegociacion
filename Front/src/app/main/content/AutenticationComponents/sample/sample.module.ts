import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';

import { FuseSampleComponent } from './sample.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
const routes = [
    {
        path: 'sample',
        component: FuseSampleComponent
    }
];

@NgModule({
    declarations: [
        FuseSampleComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        TranslateModule,

        FuseSharedModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatInputModule
    ],
    exports: [
        FuseSampleComponent
    ]
})

export class FuseSampleModule {
}
