import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { BookApiService } from "../../api/book.api.service";

@Component({
  selector: 'app-create-book-page',
  templateUrl: './create-book-page.component.html',
  styleUrls: ['create-book-page.component.scss']
})
export class CreateBookPageComponent {
  bookForm = new FormGroup({
    name: new FormControl('', [Validators.minLength(3)]),
    description: new FormControl(''),
  });

  constructor(
    private bookApiService: BookApiService
  ) { }

  submit() {
    const payload = {
      name: this.bookForm.value.name as string,
      description: this.bookForm.value.description as string,
    };
    this.bookApiService.createBook(payload).subscribe({
      next: (res) => { console.log(res) },
      error: (err) => { console.error(err) }
    });
  }
}