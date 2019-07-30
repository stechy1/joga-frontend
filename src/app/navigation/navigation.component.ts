import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserRole } from '../auth/user';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit, OnDestroy {

  showSidebar: boolean;
  isAuthenticated: boolean;
  isAdminRoutes: boolean;

  private _userSubscription: Subscription;
  private _routeSubscription: Subscription;

  constructor(private _auth: AuthService, private _route: Router) {
  }

  ngOnInit() {
    this.showSidebar = false;
   this._userSubscription = this._auth.user.subscribe(user => {
     this.isAuthenticated = user.role !== UserRole.NONE;
    });
    this._route.events.subscribe(event => {
      if (!(event instanceof NavigationEnd)) {
        return;
      }

      const adminURL = event.url.startsWith('/admin');
      this.isAdminRoutes = this.isAuthenticated && adminURL;
    });
  }

  ngOnDestroy(): void {
    this._userSubscription.unsubscribe();
    this._routeSubscription.unsubscribe();
  }

  handleLogout() {
    this._auth.logout();
  }
}
