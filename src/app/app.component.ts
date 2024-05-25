import { Component, HostListener } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MeasurementAddComponent } from './measurement-add/measurement-add.component';
import { MeasurementEditComponent } from './measurement-edit/measurement-edit.component';
import { DataService, Measurement } from './data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angularTask';
  leftPanelWidth: number = 860;
  isResizing: boolean = false;
  startX: number = 0;
  startWidth: number = 0;
  measurements: Measurement[] = [];
  selectedMeasurements: number[] = [];
  selectedMeasurement: Measurement | null = null;

  constructor(
    private dataService: DataService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.dataService.getMeasurements().subscribe((measurements) => {
      this.measurements = measurements;
    });
  }

  onMouseDown(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (target.id === 'resizerImg') {
      this.isResizing = true;
      this.startX = event.clientX;
      this.startWidth = this.leftPanelWidth;
      event.preventDefault();
    }
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (this.isResizing) {
      const dx = event.clientX - this.startX;
      this.leftPanelWidth = this.startWidth + dx;
    }
  }

  @HostListener('document:mouseup')
  onMouseUp(): void {
    this.isResizing = false;
  }

  openAddModal() {
    this.modalService.open(MeasurementAddComponent);
  }

  openEditModal(measurement: Measurement | null) {
    if (measurement) {
      const modalRef = this.modalService.open(MeasurementEditComponent);
      modalRef.componentInstance.measurement = { ...measurement };
    }
  }

  deleteMeasurements() {
    if (confirm('Вы уверены, что хотите удалить выбранные измерения?')) {
      this.dataService.deleteMeasurements(this.selectedMeasurements);
      this.selectedMeasurements = [];
      this.dataService.getMeasurements().subscribe((measurements) => {
        this.measurements = measurements;
      });
    }
  }

  toggleSelection(id: number) {
    const index = this.selectedMeasurements.indexOf(id);
    if (index > -1) {
      this.selectedMeasurements.splice(index, 1);
      if (this.selectedMeasurement?.id === id) {
        this.selectedMeasurement = null;
      }
    } else {
      this.selectedMeasurements.push(id);
      this.selectedMeasurement =
        this.measurements.find((m) => m.id === id) || null;
    }
  }
}
