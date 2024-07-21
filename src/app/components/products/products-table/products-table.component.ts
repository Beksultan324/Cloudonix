import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Product } from '../product';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { StopPropagationDirective } from '../../../directives/stop-propagation.directive';

@Component({
  selector: 'app-products-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    StopPropagationDirective,
  ],
  templateUrl: './products-table.component.html',
  styleUrl: './products-table.component.scss',
})
export class ProductsTableComponent {
  @Input({ required: true }) dataSource!: Product[];
  @Output() onEdit = new EventEmitter<Product>();
  @Output() onDelete = new EventEmitter<Product>();
  @Output() onShowDetail = new EventEmitter<Product>();
  protected readonly displayedColumns: string[] = [
    'name',
    'description',
    'sku',
    'cost',
    'profile',
    'action',
  ];
}
