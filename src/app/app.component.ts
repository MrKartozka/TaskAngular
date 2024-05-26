// Импортируем необходимые модули и компоненты
import { Component, HostListener } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MeasurementAddComponent } from './measurement-add/measurement-add.component';
import { MeasurementEditComponent } from './measurement-edit/measurement-edit.component';
import { DataService, Measurement } from './data.service';
import { CommonModule } from '@angular/common';

// Определяем аннотацию компонента
@Component({
  selector: 'app-root', // Селектор, который используется в HTML для вставки этого компонента
  templateUrl: './app.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./app.component.css'],
})

// Определяем класс компонента
export class AppComponent {
  title = 'angularTask';
  screenWidth!: number;
  leftPanelWidth: number = 895; // Начальная ширина левой панели в пикселях
  isResizing: boolean = false;
  startX: number = 0; // Начальная координата X при начале изменения размера
  startWidth: number = 0; // Начальная ширина панели при начале изменения размера
  measurements: Measurement[] = [];
  selectedMeasurements: number[] = []; // Массив для хранения выбранных измерений (их ID)
  selectedMeasurement: Measurement | null = null; // Переменная для хранения текущего выбранного измерения

  // Конструктор компонента, в котором мы инжектируем необходимые сервисы
  constructor(
    private dataService: DataService, // Сервис для работы с данными измерений
    private modalService: NgbModal // Сервис для работы с модальными окнами
  ) {}

  // Метод, который вызывается при инициализации компонента
  ngOnInit() {
    // Получаем список измерений из сервиса и сохраняем их в переменной
    this.dataService.getMeasurements().subscribe((measurements) => {
      this.measurements = measurements;
    });
    // Сохраняем текущую ширину экрана
    this.screenWidth = window.innerWidth;
    // Настраиваем макет в зависимости от ширины экрана
  }

  // Метод, который вызывается при нажатии на мышку для начала изменения размера панели
  onMouseDown(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (target.id === 'resizerImg') {
      this.isResizing = true; // Устанавливаем флаг, что мы в процессе изменения размера
      this.startX = event.clientX; // Сохраняем начальную координату X
      this.startWidth = this.leftPanelWidth; // Сохраняем текущую ширину панели
      event.preventDefault(); // Предотвращаем стандартное поведение браузера
    }
  }

  // Метод, который вызывается при движении мышки
  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (this.isResizing) {
      // Проверяем, находимся ли мы в процессе изменения размера
      const dx = event.clientX - this.startX; // Вычисляем разницу в координате X
      const container = document.querySelector('.main__inner'); // Находим контейнер с классом 'main__inner'
      if (container) {
        const containerWidth = container.clientWidth; // Получаем ширину контейнера
        const newLeftPanelWidth = this.startWidth + dx; // Вычисляем новую ширину левой панели
        const minWidth = containerWidth * 0.4; // Минимальная ширина панели (40% от ширины контейнера)
        const maxWidth = containerWidth * 0.6; // Максимальная ширина панели (60% от ширины контейнера)

        // Проверяем, что новая ширина панели находится в допустимых пределах
        if (newLeftPanelWidth >= minWidth && newLeftPanelWidth <= maxWidth) {
          this.leftPanelWidth = newLeftPanelWidth; // Устанавливаем новую ширину панели
        }
      }
    }
  }

  // Метод, который вызывается при отпускании мышки
  @HostListener('document:mouseup')
  onMouseUp(): void {
    this.isResizing = false; // Сбрасываем флаг изменения размера
  }

  // Метод, который вызывается при изменении размера окна
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    const target = event.target as Window;
    this.screenWidth = target.innerWidth; // Обновляем текущую ширину экрана
  }

  // Метод для открытия модального окна добавления измерения
  openAddModal() {
    this.modalService.open(MeasurementAddComponent);
  }

  // Метод для открытия модального окна редактирования измерения
  openEditModal() {
    if (this.selectedMeasurements.length === 1) {
      // Проверяем, что выбрано только одно измерение
      const measurement = this.measurements.find(
        (m) => m.id === this.selectedMeasurements[0]
      );
      if (measurement) {
        const modalRef = this.modalService.open(MeasurementEditComponent);
        modalRef.componentInstance.measurementId = measurement.id; // Передаем ID измерения в модальное окно
      }
    }
  }

  // Метод для удаления выбранных измерений
  deleteMeasurements() {
    if (confirm('Вы уверены, что хотите удалить выбранные измерения?')) {
      this.dataService.deleteMeasurements(this.selectedMeasurements);
      this.selectedMeasurements = [];
      this.dataService.getMeasurements().subscribe((measurements) => {
        this.measurements = measurements;
      });
    }
  }

  // Метод для переключения выбора измерения
  toggleSelection(id: number) {
    const index = this.selectedMeasurements.indexOf(id);
    if (index > -1) {
      this.selectedMeasurements.splice(index, 1); // Убираем измерение из выбранных, если оно уже было выбрано
      if (this.selectedMeasurement?.id === id) {
        this.selectedMeasurement = null;
      }
    } else {
      this.selectedMeasurements.push(id); // Добавляем измерение в выбранные
      this.selectedMeasurement =
        this.measurements.find((m) => m.id === id) || null;
    }
  }

  // Метод для переключения выбора всех измерений
  toggleSelectAll(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      this.selectedMeasurements = this.measurements.map((m) => m.id); // Выбираем все измерения
    } else {
      this.selectedMeasurements = []; // Снимаем выделение со всех измерений
    }
  }

  // Метод для проверки, можно ли редактировать измерение
  canEdit(): boolean {
    return this.selectedMeasurements.length === 1;
  }
}
