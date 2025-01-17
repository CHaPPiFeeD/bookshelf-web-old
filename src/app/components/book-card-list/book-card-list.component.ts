import { Component, Input, OnInit } from "@angular/core";
import { BookUserStatus } from "./book-card-list.enum";
import { ActivatedRoute, Router } from "@angular/router";
import { BookApiService, GetAllBooksQuery } from "../../api/book.api.service";
import { FileApiService } from "../../api/file.api.service";

@Component({
  selector: 'app-book-card-list',
  templateUrl: 'book-card-list.component.html',
  styleUrls: ['book-card-list.component.scss']
})
export class BookCardListComponent implements OnInit {
  @Input() bookMark!: BookUserStatus;
  books!: any;
  BookUserStatus = BookUserStatus;

  constructor(
    private bookApiService: BookApiService,
    private fileApiService: FileApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loadBookList();
  }

  loadBookList() {
    const params: GetAllBooksQuery = {
      book_user_status: this.bookMark,
      user_id: this.activatedRoute.snapshot.params['id'],
    };
    this.bookApiService.getAllBooks(params).subscribe({
      next: (data) => { this.books = data },
      error: (err) => { console.error(err) },
    });
  }

  createBook() {
    this.router.navigate(['book', 'create'])
  }
}

