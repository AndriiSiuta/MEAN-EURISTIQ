import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  originalUsers: User[];
  users: User[];

  constructor(private dataService:DataService) {
    console.log('this', this)
  }

  ngOnInit() {
    this.dataService.getUser().subscribe((users) => {
      this.originalUsers = users;
      this.users = this.originalUsers;
    });
    
  }

  searchContact(value:string) {
    console.log(value)
    this.users = this.originalUsers.filter(el => (el.name).indexOf(value) !== -1);
  }
}

interface User {
  email: string;
  id: number;
  name: string;
  username: string;
  website: string;
}
