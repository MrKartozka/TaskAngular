import { Component } from '@angular/core';
import { DataService, Measurement } from '../data.service';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-measurement-add',
  templateUrl: './measurement-add.component.html',
  styleUrls: ['./measurement-add.component.css'],
  standalone: true,
  imports: [FormsModule],
})
export class MeasurementAddComponent {
  // Создаем объект measurement с начальными значениями
  measurement: Measurement = {
    id: 0,
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString(),
    source: '',
    phase: '',
    voltage: null,
    current: null,
    power: null,
    reactivePower: null,
    cosPhi: null,
  };

  constructor(
    private dataService: DataService,
    public activeModal: NgbActiveModal
  ) {}

  // Метод, который вызывается при отправке формы
  onSubmit(): void {
    this.dataService.addMeasurement(this.measurement);
    this.activeModal.close();
  }

  // Метод, который вызывается при нажатии на кнопку "Отменить"
  onCancel(): void {
    this.activeModal.dismiss();
  }
}
