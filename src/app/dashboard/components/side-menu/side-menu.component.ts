import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideMenuOptionsComponent } from './side-menu-options/side-menu-options.component';

@Component({
    selector: 'app-side-menu',
    imports: [RouterOutlet, SideMenuOptionsComponent],
    templateUrl: './side-menu.component.html'
})
export default class SideMenuComponent { }
