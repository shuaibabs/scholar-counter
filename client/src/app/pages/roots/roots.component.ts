import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services';

@Component({
  selector: 'app-roots',
  templateUrl: './roots.component.html',
  styleUrls: ['./roots.component.css']
})
export class RootsComponent implements OnInit {




  constructor(
    public authService: AuthService
  ) { }

  ngOnInit(): void {


  }


}
