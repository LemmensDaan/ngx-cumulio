import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  tabIdx: 0;
  dashboardId = '';
  title = 'my-website';
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
