import {Component, OnInit, ViewChild} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import { AuthService} from '../../auth/auth.services';
import {Router, RouterModule} from '@angular/router';
import { ProfileService } from '../../services/profile.service';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { StyleClassModule } from 'primeng/styleclass';
import { Sidebar } from 'primeng/sidebar';
@Component({
  selector: 'app-sidebar',
  imports: [SidebarModule, ButtonModule, RippleModule, AvatarModule, StyleClassModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})

export class SidebarComponent implements OnInit {
  username: string ='';
  isSidebarCollapsed = false;
  constructor(private authService: AuthService,
              private router: Router,
              private profileService: ProfileService
  ) { }
  sidebarVisible: boolean = false;
  ngOnInit(): void {
    this.getUserName();
  };
  getUserName() {
    this.profileService.getUsername().subscribe({
      next: (userName: string) => this.username = userName,
      error: (err) => console.error('Failed to fetch user name:', err)
    });
  }
  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
    }

  @ViewChild('sidebarRef') sidebarRef!: Sidebar;

  onSidebarToggle() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }


}
