import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibraryShowcaseComponent } from './components/library-showcase/library-showcase.component';
import { WrapperComponent } from './components/wrapper/wrapper.component';

// TODO: Done for demo testing right now. Feel free to change paths.
// If you need a space for testing your component you can even add a separate path to it.
// For example: { path: 'b', component: BoardComponent }
const routes: Routes = [
    { path: '', component: WrapperComponent },
    { path: 'lib', component: LibraryShowcaseComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
