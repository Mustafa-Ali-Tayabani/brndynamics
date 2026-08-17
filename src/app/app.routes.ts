import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
  },
  {
    path: 'services',
    loadComponent: () => import('./pages/services/services').then((m) => m.Services),
  },
  {
    path: 'services/:slug',
    loadComponent: () =>
      import('./pages/service-detail/service-detail').then((m) => m.ServiceDetail),
  },
  {
    path: 'work',
    loadComponent: () => import('./pages/work/work').then((m) => m.Work),
  },
  {
    path: 'work/:slug',
    loadComponent: () => import('./pages/case-detail/case-detail').then((m) => m.CaseDetail),
  },
  {
    path: 'estimate',
    loadComponent: () => import('./pages/estimate/estimate').then((m) => m.Estimate),
  },
  {
    path: 'company',
    loadComponent: () => import('./pages/company/company').then((m) => m.Company),
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact').then((m) => m.Contact),
  },
  {
    path: 'legal/:doc',
    loadComponent: () => import('./pages/legal/legal').then((m) => m.Legal),
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFound),
  },
];
