import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { BookApiService } from "../../api/book.api.service";
import { HTMLInputEvent } from "../../interfaces";
import { Router } from "@angular/router";

@Component({
  selector: 'app-create-book-page',
  templateUrl: './create-book-page.component.html',
  styleUrls: ['create-book-page.component.scss']
})
export class CreateBookPageComponent {
  firstFormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]),
    description: new FormControl('', [Validators.required, Validators.minLength(16), Validators.maxLength(1024)]),
  });
  secondFormGroup = new FormGroup({
    file: new FormControl<File | null>(null, [Validators.required]),
  });
  selectedStep = 0;
  bookId: string | null = null;
  coverUrl: string | null = null;

  constructor(
    private bookApiService: BookApiService,
    private router: Router,
  ) { }

  createBook() {
    const payload = {
      name: this.firstFormGroup.value.name as string,
      description: this.firstFormGroup.value.description as string,
    };

    this.bookApiService.createBook(payload).subscribe({
      next: (data: any) => {
        this.bookId = data.id;
        console.log(data)
        this.changeStep(1);
      },
      error: (err) => { console.error(err) }
    });
  }

  uploadCover() {
    if (!this.bookId || !this.secondFormGroup.value.file) return;
    this.bookApiService.uploadCover(this.bookId, this.secondFormGroup.value.file)
      .subscribe({
        next: (data: any) => {
          this.coverUrl = data;
        },
        error: (err) => { console.error(err) },
      });
  }

  selectFile(event: Event): void {
    const input = event as HTMLInputEvent;
    if (!input.target.files?.item(0)) return;
    this.secondFormGroup.setValue({ file: input.target.files?.item(0) });
    this.uploadCover()
  }

  changeStep(stepShift: number): void {
    this.selectedStep = this.selectedStep + stepShift
  }

  toProfile() {
    this.router.navigate(['/profile', localStorage.getItem('user_id')])
  }
}