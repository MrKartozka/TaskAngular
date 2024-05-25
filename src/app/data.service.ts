import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Measurement {
  id: number;
  date: string;
  time: string;
  source: string;
  phase?: string;
  voltage?: number;
  current?: number;
  power?: number;
  reactivePower?: number;
  cosPhi?: number;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private measurements: Measurement[] = [
    { id: 1, date: '30.07.2022', time: '10.15:23', source: 'Оператор' },
    { id: 2, date: '30.07.2022', time: '10.08:44', source: 'Оператор' },
    {
      id: 3,
      date: '29.07.2022',
      time: '15.08:44',
      source: 'Оператор',
      phase: 'a',
      voltage: 1,
      current: 0.5,
      power: 3,
      reactivePower: 0.7,
      cosPhi: 0.67,
    },
    {
      id: 4,
      date: '12.06.2022',
      time: '10:28:44',
      source: 'SCADA',
      phase: 'b',
      voltage: 1,
      current: 0.6,
      power: 2.756,
      reactivePower: 0.9,
      cosPhi: 0.83,
    },
    {
      id: 5,
      date: '05.05.2022',
      time: '13.56:39',
      source: 'АСКУЭ',
      phase: 'c',
      voltage: 1.2,
      current: 0.5,
      power: 3.143,
      reactivePower: 0.78,
      cosPhi: 0.67,
    },
    {
      id: 6,
      date: '05.05.2022',
      time: '13.56:39',
      source: 'АСКУЭ',
      phase: 'c',
      voltage: 1.2,
      current: 0.5,
      power: 3.143,
      reactivePower: 0.78,
      cosPhi: 0.67,
    },
    {
      id: 7,
      date: '02.03.2022',
      time: '17.43:51',
      source: 'Регистратор',
      phase: 'ab',
      voltage: 1.1,
      current: 0.4,
      power: 3.343,
      reactivePower: 0.76,
      cosPhi: 0.65,
    },
  ];

  getMeasurements(): Observable<Measurement[]> {
    return of(this.measurements);
  }

  addMeasurement(measurement: Measurement): void {
    this.measurements.push({
      ...measurement,
      id: this.measurements.length + 1,
    });
  }

  updateMeasurement(updatedMeasurement: Measurement): void {
    const index = this.measurements.findIndex(
      (m) => m.id === updatedMeasurement.id
    );
    if (index !== -1) {
      this.measurements[index] = updatedMeasurement;
    }
  }

  deleteMeasurements(ids: number[]): void {
    this.measurements = this.measurements.filter((m) => !ids.includes(m.id));
  }
}
