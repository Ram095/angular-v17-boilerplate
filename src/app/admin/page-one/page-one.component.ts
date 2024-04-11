import {
  Component,
  OnInit,
  signal,
  TemplateRef,
  ViewChild,
  WritableSignal,
} from '@angular/core';
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
import { AdminService } from '../admin.service';

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
export class PageOneComponent implements OnInit {
  gridApi: any;
  carDetailsForm: FormGroup;
  closeResult = '';
  selectedRecord: any;
  toggleEditButton = false;
  @ViewChild('confirmDeleteModal', { static: true }) deleteTemplate: any;
  @ViewChild('carDetails', { static: true }) detailTemplate: any;

  apiResponse!: ICarDetail[];
  //Writable Signal
  carDetailCount: WritableSignal<number> = signal(0);

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

  gridOptions = <GridOptions>{
    context: {
      componentParent: this,
    },
  };

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

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private adminService: AdminService
  ) {
    this.carDetailsForm = this.fb.group({
      make: this.fb.control('', Validators.required),
      model: this.fb.control('', [Validators.required]),
      price: this.fb.control('', [Validators.required]),
      electric: this.fb.control(false),
      country: this.fb.control('', [Validators.required]),
    });
  }
  ngOnInit(): void {
    this.adminService.getCarDetails().subscribe((res) => {
      this.apiResponse = res;
      this.carDetailCount.set(this.apiResponse.length);
    });
  }

  onGridReady(params: any) {
    this.gridApi = params?.api;
  }

  openAddModal(content: TemplateRef<any>) {
    this.toggleEditButton = false;
    this.carDetailsForm.reset();
    const modalRef = this.modalService.open(content);
    modalRef.result.then((reason) => {
      `Dismissed ${this.adminService.getDismissReason(reason)}`;
    });
  }

  saveCarDetails() {
    if (this.carDetailsForm.valid) {
      const newRecord = this.carDetailsForm.value;
      this.apiResponse.push({ ...newRecord });
      this.apiResponse = JSON.parse(JSON.stringify(this.apiResponse));
      this.carDetailCount.set(this.apiResponse.length);
      this.modalService.dismissAll('saved');
    }
  }

  onDeleteRecord(param: ICarDetail) {
    let newResponse: ICarDetail[] = [];
    this.selectedRecord = param;
    this.modalService.open(this.deleteTemplate).result.then(
      (result) => {
        this.closeResult = `Closed with: ${this.adminService.getDismissReason({
          result,
        })}`;

        this.apiResponse.forEach((rec: ICarDetail) => {
          if (rec.make !== this.selectedRecord.make) {
            newResponse.push(rec);
          }
        });

        this.apiResponse = [...newResponse];
        this.carDetailCount.set(this.apiResponse.length);
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.adminService.getDismissReason({
          reason,
        })}`;
      }
    );
  }

  onEditRecord(param: ICarDetail) {
    this.selectedRecord = param;
    this.carDetailsForm.patchValue(this.selectedRecord);
    this.toggleEditButton = true;
    this.modalService.open(this.detailTemplate).result.then((reason) => {
      this.closeResult = `Dismissed ${this.adminService.getDismissReason({
        reason,
      })}`;
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
