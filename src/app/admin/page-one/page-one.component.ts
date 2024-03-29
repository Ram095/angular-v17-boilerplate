import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-page-one',
  templateUrl: './page-one.component.html',
  styleUrl: './page-one.component.scss',
})
export class PageOneComponent {
  gridApi: any;
  carDetailsForm: FormGroup;
  apiResponse: any = [
    {
      make: 'Tesla',
      model: 'Model Y',
      price: 64950,
      electric: true,
      country: 'USA',
    },
    {
      make: 'Ford',
      model: 'F-Series',
      price: 33850,
      electric: false,
      country: 'USA',
    },
    {
      make: 'Toyota',
      model: 'Corolla',
      price: 29600,
      electric: false,
      country: 'Japan',
    },
    {
      make: 'Mercedes',
      model: 'EQA',
      price: 48890,
      electric: true,
      country: 'USA',
    },
  ];

  // Column Definitions: Defines the columns to be displayed.
  colDefs: ColDef[] = [
    { field: 'make' },
    { field: 'model' },
    { field: 'price' },
    { field: 'electric' },
    { field: 'country' },
  ];

  get makeControl(): FormControl {
    return this.carDetailsForm.get('make') as FormControl;
  }
  get modelControl(): FormControl {
    return this.carDetailsForm.get('model') as FormControl;
  }
  get priceControl(): FormControl {
    return this.carDetailsForm.get('price') as FormControl;
  }
  get electricControl(): FormControl {
    return this.carDetailsForm.get('electric') as FormControl;
  }
  get countryControl(): FormControl {
    return this.carDetailsForm.get('country') as FormControl;
  }

  constructor(private fb: FormBuilder) {
    this.carDetailsForm = this.fb.group({
      make: this.fb.control('', [Validators.required]),
      model: this.fb.control('', [Validators.required]),
      price: this.fb.control('', [Validators.required]),
      electric: this.fb.control('', [Validators.required]),
      country: this.fb.control('', [Validators.required]),
    });
  }

  onGridReady(params: any) {
    this.gridApi = params?.api;
  }

  openAddModal() {}
}
