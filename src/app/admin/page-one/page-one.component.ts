import { Component, TemplateRef, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ColDef, ICellRendererParams } from 'ag-grid-community';
import { GridOptions } from 'ag-grid-community';

@Component({
  standalone: true,
  template: `<div class="row">
    <div (click)="DeleteRow()" class="col-6 icon">
      <i class="bi bi-trash"></i>
    </div>
    <br />
    <div (click)="EditRow()" class="col-6 icon">
      <i class="bi bi-pencil"></i>
    </div>
  </div>`,
})
export class ActionButtonComponent implements ICellRendererAngularComp {
  params!: ICellRendererParams;
  agInit(params: ICellRendererParams): void {
    this.params = params;
  }
  refresh(params: ICellRendererParams) {
    this.params = params;
    return true;
  }
  DeleteRow() {
    this.params.context.componentParent.onDeleteRecord(this.params.data);
  }
  EditRow() {
    this.params.context.componentParent.onEditRecord(this.params.data);
  }
}

export interface ICarDetail {
  make: string;
  model: string;
  price: number;
  electric: boolean;
  country: string;
}

@Component({
  selector: 'app-page-one',
  templateUrl: './page-one.component.html',
  styleUrl: './page-one.component.scss',
})
export class PageOneComponent {
  gridApi: any;
  carDetailsForm: FormGroup;
  closeResult = '';
  selectedRecord: any;
  toggleEditButton = false;
  @ViewChild('confirmDeleteModal', { static: true }) deleteTemplate: any;
  @ViewChild('carDetails', { static: true }) detailTemplate: any;

  apiResponse: ICarDetail[] = [
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
    {
      make: 'BMW',
      model: '3 Series',
      price: 40450,
      electric: false,
      country: 'Germany',
    },
    {
      make: 'Audi',
      model: 'Q5',
      price: 43600,
      electric: false,
      country: 'Germany',
    },
    {
      make: 'Nissan',
      model: 'Leaf',
      price: 31400,
      electric: true,
      country: 'Japan',
    },
    {
      make: 'Chevrolet',
      model: 'Silverado',
      price: 28500,
      electric: false,
      country: 'USA',
    },
    {
      make: 'Honda',
      model: 'Civic',
      price: 22150,
      electric: false,
      country: 'Japan',
    },
    {
      make: 'Hyundai',
      model: 'Kona',
      price: 21350,
      electric: true,
      country: 'South Korea',
    },
    {
      make: 'Volkswagen',
      model: 'Passat',
      price: 26390,
      electric: false,
      country: 'Germany',
    },
    {
      make: 'Volvo',
      model: 'XC90',
      price: 49500,
      electric: false,
      country: 'Sweden',
    },
    {
      make: 'Mazda',
      model: 'CX-5',
      price: 27440,
      electric: false,
      country: 'Japan',
    },
    {
      make: 'Kia',
      model: 'Sorento',
      price: 29090,
      electric: false,
      country: 'South Korea',
    },
    {
      make: 'Subaru',
      model: 'Outback',
      price: 26745,
      electric: false,
      country: 'Japan',
    },
    {
      make: 'Lexus',
      model: 'RX',
      price: 45170,
      electric: false,
      country: 'Japan',
    },
    {
      make: 'Jeep',
      model: 'Wrangler',
      price: 28765,
      electric: false,
      country: 'USA',
    },
    {
      make: 'Land Rover',
      model: 'Range Rover',
      price: 92450,
      electric: false,
      country: 'UK',
    },
    {
      make: 'Porsche',
      model: '911',
      price: 101200,
      electric: false,
      country: 'Germany',
    },
    {
      make: 'GMC',
      model: 'Sierra',
      price: 30100,
      electric: false,
      country: 'USA',
    },
    {
      make: 'Ram',
      model: '1500',
      price: 33200,
      electric: false,
      country: 'USA',
    },
    {
      make: 'Chrysler',
      model: 'Pacifica',
      price: 35995,
      electric: false,
      country: 'USA',
    },
    {
      make: 'Buick',
      model: 'Encore',
      price: 24500,
      electric: false,
      country: 'USA',
    },
    {
      make: 'Jaguar',
      model: 'F-Pace',
      price: 51600,
      electric: false,
      country: 'UK',
    },
    {
      make: 'Infiniti',
      model: 'QX50',
      price: 38650,
      electric: false,
      country: 'Japan',
    },
    {
      make: 'Mitsubishi',
      model: 'Outlander',
      price: 26745,
      electric: false,
      country: 'Japan',
    },
    {
      make: 'Acura',
      model: 'MDX',
      price: 47200,
      electric: false,
      country: 'Japan',
    },
    {
      make: 'Lincoln',
      model: 'Navigator',
      price: 77090,
      electric: false,
      country: 'USA',
    },
    {
      make: 'Cadillac',
      model: 'Escalade',
      price: 79495,
      electric: false,
      country: 'USA',
    },
    {
      make: 'Fiat',
      model: '500X',
      price: 25895,
      electric: false,
      country: 'Italy',
    },
  ];

  // Column Definitions: Defines the columns to be displayed.
  colDefs: ColDef[] = [
    { field: '', checkboxSelection: true, width: 50 },
    { field: 'make', filter: true, floatingFilter: true },
    { field: 'model', filter: true, floatingFilter: true },
    { field: 'price' },
    { field: 'electric', width: 150 },
    { field: 'country', filter: true, floatingFilter: true },
    {
      field: 'action',
      width: 150,
      cellRenderer: ActionButtonComponent,
      filter: false,
      sortable: false,
    },
  ];

  public paginationPageSize = 10;
  public paginationPageSizeSelector: number[] | boolean = [10, 25, 50];

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

  get registerFormControl() {
    return this.carDetailsForm.controls;
  }

  constructor(private fb: FormBuilder, private modalService: NgbModal) {
    this.carDetailsForm = this.fb.group({
      make: this.fb.control('', Validators.required),
      model: this.fb.control('', [Validators.required]),
      price: this.fb.control('', [Validators.required]),
      electric: this.fb.control(false),
      country: this.fb.control('', [Validators.required]),
    });
  }

  gridOptions = <GridOptions>{
    context: {
      componentParent: this,
    },
  };

  onGridReady(params: any) {
    this.gridApi = params?.api;
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'Reason was escape press';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'Backdrop was clicked';
    } else {
      return `with: ${reason}`;
    }
  }

  openAddModal(content: TemplateRef<any>) {
    this.toggleEditButton = false;
    this.carDetailsForm.reset();
    const modalRef = this.modalService.open(content);
    modalRef.result.then((reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  saveCarDetails() {
    if (this.carDetailsForm.valid) {
      const newRecord = this.carDetailsForm.value;
      this.apiResponse.push({ ...newRecord });
      this.apiResponse = JSON.parse(JSON.stringify(this.apiResponse));
      this.modalService.dismissAll('saved');
    }
  }

  onDeleteRecord(param: ICarDetail) {
    let newResponse: ICarDetail[] = [];
    this.selectedRecord = param;
    this.modalService.open(this.deleteTemplate).result.then(
      (result) => {
        this.closeResult = `Closed with: ${this.getDismissReason({ result })}`;

        this.apiResponse.forEach((rec: ICarDetail) => {
          if (rec.make !== this.selectedRecord.make) {
            newResponse.push(rec);
          }
        });

        this.apiResponse = [...newResponse];
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason({ reason })}`;
      }
    );
  }

  onEditRecord(param: ICarDetail) {
    this.selectedRecord = param;
    this.carDetailsForm.patchValue(this.selectedRecord);
    this.toggleEditButton = true;
    this.modalService.open(this.detailTemplate).result.then((reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason({ reason })}`;
    });
  }

  editCarDetails() {
    if (this.carDetailsForm.valid) {
      const updatedValue = this.carDetailsForm.value;
      let existingRecordIndex = this.apiResponse.findIndex(
        (item: ICarDetail) =>
          item.make === this.selectedRecord.make &&
          item.model === this.selectedRecord.model
      );
      this.apiResponse[existingRecordIndex] = updatedValue;
      this.apiResponse = JSON.parse(JSON.stringify(this.apiResponse));
      this.modalService.dismissAll('updated');
    }
  }
}
