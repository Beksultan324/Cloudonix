import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { Product } from '../product';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-show-detail-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
  ],
  templateUrl: './show-detail-dialog.component.html',
  styleUrl: './show-detail-dialog.component.scss',
})
export class ShowDetailDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public product: Product) {}
}
