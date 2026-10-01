import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
 
@Component({
selector: 'app-header',
standalone: true,
imports: [
MatToolbarModule,
MatIconModule,
RouterLink,
RouterLinkActive
],
templateUrl: './header.html',
styleUrl: './header.scss'
})
export class HeaderComponent {}