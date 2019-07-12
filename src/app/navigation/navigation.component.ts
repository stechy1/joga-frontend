import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

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

  constructor(private _auth: AuthService, private _route: Router) { }

  ngOnInit() {
   this._userSubscription = this._auth.user.subscribe(user => {
     this.isAuthenticated = !!user;
    });
   this._route.events.subscribe(event => {
     if (!(event instanceof NavigationEnd)) {
       return;
     }

     const adminURL = event.url === '/admin';
     this.isAdminRoutes = this.isAuthenticated && adminURL;
   });
  }

  ngOnDestroy(): void {
    this._userSubscription.unsubscribe();
    this._routeSubscription.unsubscribe();
  }



}
