import { Component, OnInit, Input } from '@angular/core';
import { DataService, Measurement } from '../data.service';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-measurement-edit',
  templateUrl: './measurement-edit.component.html',
  styleUrls: ['./measurement-edit.component.css'],
  standalone: true,
  imports: [FormsModule],
})
export class MeasurementEditComponent implements OnInit {
  @Input() measurementId!: number;
  measurement!: Measurement;
  originalMeasurement!: Measurement; // Копия оригинального измерения

  constructor(
    private dataService: DataService,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.dataService
      .getMeasurement(this.measurementId)
      .subscribe((measurement) => {
        this.measurement = { ...measurement }; // Создаем копию измерения для редактирования
        this.originalMeasurement = { ...measurement }; // Сохраняем оригинал для отмены изменений
      });
  }

  onSubmit(): void {
    this.dataService.updateMeasurement(this.measurement); // Сохраняем изменения
    this.activeModal.close();
  }

  onCancel(): void {
    this.measurement = { ...this.originalMeasurement }; // Восстанавливаем оригинальное измерение при отмене
    this.activeModal.dismiss(); // Закрываем модальное окно
  }
}
