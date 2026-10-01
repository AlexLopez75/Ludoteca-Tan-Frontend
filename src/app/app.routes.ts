import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: '/games', pathMatch: 'full'},
    { path: 'categories', loadComponent: () => import('../category/category-list/category-list.page').then(m => m.CategoryListComponent)},
    { path: 'authors', loadComponent: () => import('../author/author-list/author-list.page').then(m => m.AuthorListComponent)},
    { path: 'games', loadComponent: () => import('../game/game-list/game-list.page').then(m => m.GameListComponent)},
    { path: 'clients', loadComponent: () => import('../clients/clients-list/clients-list.page').then(m => m.ClientsListComponent)},
];
