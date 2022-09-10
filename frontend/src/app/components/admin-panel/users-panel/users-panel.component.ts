import { Constants } from './../../../constants/constants';
import { ToastrService } from 'ngx-toastr';
import { UserService } from './../../../services/user.service';
import { User } from './../../../models/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users-panel',
  templateUrl: './users-panel.component.html',
  styleUrls: ['./users-panel.component.css']
})
export class UsersPanelComponent implements OnInit {

  users: User[] = [];
  dataLoaded: boolean = false;

  constructor(
    private userService: UserService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe({
      next: (response) => {
        this.users = response.data;
        this.dataLoaded = true;
      },
      error: (errorResponse) => {
        this.toastrService.error(Constants.dataError, errorResponse.error);
        this.dataLoaded = false;
      }
    });
  }

  delete(userId: number) {
    this.userService.deleteUser(userId).subscribe({
      next: (response) => {
        this.toastrService.info(Constants.deleted, response.message);
      },
      error: (errorResponse) => {
        this.toastrService.error(Constants.deleteError, errorResponse.error);
      },
      complete: () => {
        this.getUsers();
      }
    });

  }
}
