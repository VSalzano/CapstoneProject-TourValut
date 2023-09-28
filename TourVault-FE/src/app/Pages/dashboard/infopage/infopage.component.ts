import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-infopage',
  templateUrl: './infopage.component.html',
  styleUrls: ['./infopage.component.scss'],
})
export class InfopageComponent {
  constructor(private route: ActivatedRoute) {}
}
