import { Component, Input } from "@angular/core";
import { BookUserStatus } from "./book-card-list.enum";
import { Router } from "@angular/router";

@Component({
  selector: 'app-book-card-list',
  templateUrl: 'book-card-list.component.html',
  styleUrls: ['book-card-list.component.scss']
})
export class BookCardListComponent {
  @Input() bookMark!: BookUserStatus;
  BookUserStatus = BookUserStatus

  constructor(
    private router: Router,
  ) {}

  createBook() {
    this.router.navigate(['book', 'create'])
  }
}

