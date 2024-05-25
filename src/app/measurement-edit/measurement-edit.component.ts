import { Component, Input } from '@angular/core';
import { DataService, Measurement } from '../data.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-measurement-edit',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './measurement-edit.component.html',
  styleUrl: './measurement-edit.component.css',
})
export class MeasurementEditComponent {
  @Input() measurement!: Measurement;

  constructor(
    private dataService: DataService,
    public activeModal: NgbActiveModal
  ) {}

  onSubmit() {
    this.dataService.updateMeasurement(this.measurement);
    this.activeModal.close();
  }

  close() {
    this.activeModal.dismiss();
  }
}
