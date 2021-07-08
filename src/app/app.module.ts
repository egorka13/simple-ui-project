import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { LibraryModule } from './library/library.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ConfigPanelComponent } from './components/config-panel/config-panel.component';
import { ComponentPanelComponent } from './components/component-panel/component-panel.component';
import { BoardComponent } from './components/board/board.component';
import { BoardItemComponent } from './components/board/board-item/board-item.component';
import { WrapperComponent } from './components/wrapper/wrapper.component';
import { LibraryShowcaseComponent } from './components/library-showcase/library-showcase.component';

@NgModule({
    declarations: [
        AppComponent,
        BoardComponent,
        BoardItemComponent,
        HeaderComponent,
        WrapperComponent,
        ConfigPanelComponent,
        ComponentPanelComponent,
        LibraryShowcaseComponent
    ],
    imports: [
        LibraryModule,
        BrowserModule,
        AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
