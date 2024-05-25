import { Component } from '@angular/core';
import { DataService, Measurement } from '../data.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-measurement-add',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './measurement-add.component.html',
  styleUrl: './measurement-add.component.css',
})
export class MeasurementAddComponent {
  measurement: Partial<Measurement> = {};

  constructor(
    private dataService: DataService,
    public activeModal: NgbActiveModal
  ) {}

  onSubmit() {
    const newMeasurement: Measurement = {
      ...this.measurement,
      id: 0,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
    } as Measurement;
    this.dataService.addMeasurement(newMeasurement);
    this.activeModal.close();
  }

  close() {
    this.activeModal.dismiss();
  }
}
