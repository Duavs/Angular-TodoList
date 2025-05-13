import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import { AuthService} from '../../auth/auth.services';
import {Router, RouterModule} from '@angular/router';
@Component({
  selector: 'app-sidebar',
    imports: [
        RouterLink
    ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})

export class SidebarComponent{
  username: string ='';
  constructor(private authService: AuthService,
              private router: Router
  ) { }

  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
    }
}
