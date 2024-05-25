import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angularTask';
  leftPanelWidth: number = 860;
  isResizing: boolean = false;
  startX: number = 0;
  startWidth: number = 0;

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
}
