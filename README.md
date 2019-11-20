# Using ngx-cumulio to show a [Cumul.io](https://cumul.io/main) dashboard

## [Demo Part 1](https://stackblitz.com/edit/ngx-cumulio-tutorial-part1) | [Code Part 1](https://github.com/LemmensDaan/ngx-cumulio-demo-part1)

# Contents

- [What we will build](#What-we-will-build)
- [Part 2 - Multipage application mith several dashboards](#Part-2---Embedding-dashboards-in-a-multipage-application)
  - [Displaying the dashboard](#Displaying-the-dashboard)
  - [Code](#Code)
- [Conclusion](#Conclusion)
- [Quick Links](#Quick-Links)

---

# What we will build

This is part 2 of the tutorial of ngx-cumulio. Go to [part 1](https://github.com/LemmensDaan/ngx-cumulio-demo-part1) if you haven't read it yet.  
For this part we will make a multipage website with a few dashboards.

---

# Part 2 - Embedding dashboards in a multipage application

We will pick up where we left at part 1.
Let's start first with adding our pages. We'll have two: home and dashboard.

```bash
ng generate component home
ng generate component dashboard
```

To create the routes to our component, first add them in the **`app-routing.module.ts`**:

```Typescript
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
 {
   path: '',
   pathMatch: 'full',
   component: HomeComponent
 },
 {
   path: 'dashboards',
   component: DashboardComponent
 },
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule]
})
export class AppRoutingModule { }
```

Then, make a navbar menu in **`app.component.html`**:

```HTML
<nav class="navbar">
  <!-- Title -->
  <div class="navbar-title">
    <h1>My Website</h1>
  </div>
  <!-- Menu -->
  <div class="navbar-menu">
    <div class="navbar-start">
      <a class="navbar-item" routerLink="">Home</a>
      <a class="navbar-item" routerLink="dashboards">Dashboards</a>
    </div>
  </div>
</nav>
  <!-- Content -->
<router-outlet></router-outlet>
<!-- Footer -->
<footer class="footer"><span></span></footer>
```

And add the css in **`app.component.scss`**:

```CSS
:host {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 14px;
  color: white;
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Header */
.navbar,
.navbar-end,
.navbar-menu,
.navbar-start {
  -webkit-box-align: stretch;
  -ms-flex-align: stretch;
  align-items: stretch;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}

.navbar {
  background-color: #3a3a3a;
  -webkit-box-align: stretch;
  display: flex;
}

.navbar-menu {
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  padding-left: 1rem;
}

.navbar-item {
  -webkit-box-align: center;
  align-items: center;
  display: flex;
  padding-right: 1rem;
}

.navbar-item:hover,
.navbar-item:active {
  background-color: #2c2c2c;
}

.navbar a,
.navbar-title h1 {
  text-decoration: none;
  padding-left: 1rem;
  color: rgb(233, 233, 233);
}

.navbar a {
  font-size: large;
}

/* Footer */
.footer {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #3a3a3a;
  color: white;
  font-weight: 600;
}
```

Now our pages will work. The first page _home_ will display a simple home page. THe dashboard component will eventually show a few tabs with each a dashboard.
We will first add some simple HTML and CSS for our home page.
**`home.component.html`**:

```HTML
<div class="container">
  <div class="title">
    <h1>Home Page</h1>
  </div>
  <div class="content">
    <p>Go to the dashboards tab to view your dashboards!</p>
  </div>
</div>
```

**`home.component.scss`**

```CSS
.container {
  height: 100%;
  background-color: #209cee;
  padding: 1rem;
}

.title h1 {
  background-color: #209cee;
}

.container p {
  font-size: large;
}

```

Now for our dashboard component.
Let's add some dashboards and tabs first in our **`dashboard.component.ts`**:

```Typescript
export class AppComponent implements OnInit{
  ...
  tabs = [ 'Facebook', 'LinkedIn', 'Adwords'];
  dashboards = [
    '763177aa-9b93-4ae7-903e-3cb07dc593d8',
    '722fa789-89c8-4149-be4d-bc3eb348a65f',
    'eb8a3bec-2d19-4229-b40a-2f31ad379780'
  ];
  ...
}
```

You can use your own dashboards and tabs if you want.
Now we want to go to different dashboards depending on which tab we are on.

```Typescript
export class AppComponent implements OnInit{
  tabIdx: 0;
  dashboardId = '';

  ...

  ngOnInit() {
    this.changeTab(0);
  }
  changeTab(idx): void {
    this.tabIdx = idx;
    const dashboardId = this.dashboards[this.tabIdx];
    this.dashboardId = dashboardId;
  }
}
```

When we startup our application we will show tab 0, so also the first dashboard in our array. When we go to another tab, another dashboard will show.

Now we will edit the **`dashboard.component.html`** so that we can actually see the tabs and dashboards.
Add the tabs to the toolbar. This will show all tabs, this way when you click on a tab, it will show you the dashboard from the same index as your tabs.

```HTML
<div class="toolbar" role="banner">
  <!-- Tabs -->
  <ul class="tabs">
    <li *ngFor="let tab of tabs; index as i"
      (click)="changeTab(i)">{{tab}}</li>
  </ul>
</div>
```

then change

```Typescript
[dashboard]="'763177aa-9b93-4ae7-903e-3cb07dc593d8'"
```

to

```Typescript
[(dashboard)]="dashboardId"
```

Now you only need 1 cumulio-dashboard element. all the parameters will be used with all the dashboards.

Also add some changes to the **`dashboard.component.scss`** file, you can always use your own styling.

```CSS
/* Toolbar */
.toolbar {
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  background-color: rgb(124, 40, 124);
  color: white;
  font-weight: 600;
  position: relative;
  box-shadow: 0 0 1.5rem rgba(0, 0, 0, 0.1);
  z-index: 1;
  overflow: hidden;
}

/* Tabs */
.tabs {
  list-style: none;
  bottom: 0;
  min-width: 40rem;
  margin-bottom: 0;
  position: absolute;
  padding-left: 0;
  padding-bottom: 0.4rem;
}

.tabs li {
  float: left;
  width: 8rem;
  text-align: center;
  line-height: 3rem;
  margin-right: 1rem;
  text-transform: uppercase;
  font-weight: bold;
  cursor: pointer;
  user-select: none;
  color: rgb(233, 233, 233);
  overflow: hidden;
  white-space: nowrap;
}

.tabs li:hover {
  color: #d4d4d4;
}
.tabs li:nth-of-type(1).active {
  color: rgb(255, 255, 255);
}
.tabs li:nth-of-type(2).active {
  color: rgb(255, 255, 255);
}
.tabs li:nth-of-type(3).active {
  color: rgb(255, 255, 255);
}

/* Content */
.content {
  display: flex;
  margin: 32px auto;
  padding: 0 16px 16px;
  flex-direction: column;
  align-items: center;
}

```

**That's it! With part 2 concluded, you now have a multipage application with some embedded dashboards.**

---

## Code

**`app-routing.module.ts`**

```Typescript
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'dashboards',
    component: DashboardComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

```

**`app.component.html`**

```HTML
<nav class="navbar">
  <!-- Title -->
  <div class="navbar-title">
      <h1>My Website</h1>
  </div>
  <!-- Menu -->
  <div class="navbar-menu">
    <div class="navbar-start">
      <a class="navbar-item" routerLink="">Home</a>
      <a class="navbar-item" routerLink="dashboards">Dashboards</a>
    </div>
  </div>
</nav>
  <!-- Content -->
<router-outlet></router-outlet>
<!-- Footer -->
<footer class="footer"><span></span></footer>
```

**`app.component.scss`**

```CSS
:host {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 14px;
  color: white;
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Header */
.navbar,
.navbar-end,
.navbar-menu,
.navbar-start {
  -webkit-box-align: stretch;
  -ms-flex-align: stretch;
  align-items: stretch;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}

.navbar {
  background-color: #3a3a3a;
  -webkit-box-align: stretch;
  display: flex;
}

.navbar-menu {
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  padding-left: 1rem;
}

.navbar-item {
  -webkit-box-align: center;
  align-items: center;
  display: flex;
  padding-right: 1rem;
}

.navbar-item:hover,
.navbar-item:active {
  background-color: #2c2c2c;
}

.navbar a,
.navbar-title h1 {
  text-decoration: none;
  padding-left: 1rem;
  color: rgb(233, 233, 233);
}

.navbar a {
  font-size: large;
}

/* Footer */
.footer {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #3a3a3a;
  color: white;
  font-weight: 600;
}

```

**`home.component.html`**

```HTML
<div class="container">
  <div class="title">
    <h1>Home Page</h1>
  </div>
  <div class="content">
    <p>Go to the dashboards tab to view your dashboards!</p>
  </div>
</div>
```

**`home.component.scss`**

```CSS
.container {
  height: 100%;
  background-color: #209cee;
  padding: 1rem;
}

.title h1 {
  background-color: #209cee;
}

.container p {
  font-size: large;
}

```

**`dashboard.component.ts`**

```Typescript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  tabIdx: 0;
  dashboardId = '';
  tabs = [ 'Facebook', 'LinkedIn', 'Adwords'];
  dashboards = [
    '763177aa-9b93-4ae7-903e-3cb07dc593d8',
    '722fa789-89c8-4149-be4d-bc3eb348a65f',
    'eb8a3bec-2d19-4229-b40a-2f31ad379780'
  ];

  ngOnInit() {
    this.changeTab(0);
  }
  changeTab(idx): void {
    this.tabIdx = idx;
    const dashboardId = this.dashboards[this.tabIdx];
    this.dashboardId = dashboardId;
  }
}

```

**`dashboard.component.html`**

```HTML
<!-- Toolbar -->
<div class="main">
  <div class="toolbar" role="banner">
    <!-- Tabs -->
    <ul class="tabs">
      <li *ngFor="let tab of tabs; index as i" [class.active]="tabIdx==i"
        (click)="changeTab(i)">{{tab}}</li>
    </ul>
  </div>
  <div class="content" role="main">
    <!-- Content -->
    <cumulio-dashboard
      [(dashboard)]="dashboardId"
      [loaderBackground]="'rgb(238, 243, 246)'"
      [loaderFontColor]="'rgb(124, 40, 124)'"
      [loaderSpinnerColor]="'rgb(124, 40, 124)'"
      [loaderSpinnerBackground]="'rgb(194, 209, 233)'">
    </cumulio-dashboard>
  </div>
</div>
```

**`dashboard.component.scss`**

```CSS
/* Toolbar */
.toolbar {
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  background-color: rgb(124, 40, 124);
  color: white;
  font-weight: 600;
  position: relative;
  box-shadow: 0 0 1.5rem rgba(0, 0, 0, 0.1);
  z-index: 1;
  overflow: hidden;
}

/* Tabs */
.tabs {
  list-style: none;
  bottom: 0;
  min-width: 40rem;
  margin-bottom: 0;
  position: absolute;
  padding-left: 0;
  padding-bottom: 0.4rem;
}

.tabs li {
  float: left;
  width: 8rem;
  text-align: center;
  line-height: 3rem;
  margin-right: 1rem;
  text-transform: uppercase;
  font-weight: bold;
  cursor: pointer;
  user-select: none;
  color: rgb(233, 233, 233);
  overflow: hidden;
  white-space: nowrap;
}

.tabs li:hover {
  color: #d4d4d4;
}
.tabs li:nth-of-type(1).active {
  color: rgb(255, 255, 255);
}
.tabs li:nth-of-type(2).active {
  color: rgb(255, 255, 255);
}
.tabs li:nth-of-type(3).active {
  color: rgb(255, 255, 255);
}

/* Content */
.content {
  display: flex;
  margin: 32px auto;
  padding: 0 16px 16px;
  flex-direction: column;
  align-items: center;
}

```

**`styles.scss`**

```CSS
html, body {
    height: 100%;
    margin: 0;
}
body {
    background-color: rgb(238, 243, 246);
}
```

---

# Quick Links

[Cumul.io](https://cumul.io/main)  
[Code Part 1](https://github.com/LemmensDaan/ngx-cumulio-demo-part2) | [Demo Part 1](https://stackblitz.com/edit/ngx-cumulio-tutorial-part2)  
[Code Part 2](https://github.com/LemmensDaan/ngx-cumulio-demo-part2) | [Demo Part 2](https://stackblitz.com/edit/ngx-cumulio-tutorial-part2)  
[npm ngx-cumulio](https://www.npmjs.com/package/ngx-cumulio)
