import {AfterViewInit, Directive, ElementRef, HostListener, Input, NgZone, OnInit} from '@angular/core';
import {SortService} from './sort.service';
import {SelectionService} from './selection.service';
import {timer} from 'rxjs';

@Directive({
  selector: '[ngSortgridItem]'
})
export class NgSortgridItemDirective implements OnInit, AfterViewInit {

  @Input('ngSortgridItem')
  private ngSortGridItemKey: string;
  private selected: boolean;

  private readonly SELECTED_CLASS = 'selected';

  constructor(public el: ElementRef, public zone: NgZone, private sortService: SortService, private selectionService: SelectionService) {
  }

  ngOnInit(): void {
    this.selected = false;
  }

  ngAfterViewInit(): void {
    this.el.nativeElement.draggable = true;
  }

  @HostListener('dragstart', ['$event'])
  dragStart(event): void {
    this.sortService.initSort(event.target);
  }

  @HostListener('dragenter', ['$event'])
  dragEnter(event): void {
    this.sortService.sort(event.target);
  }

  @HostListener('dragover', ['$event'])
  dragOver(event): boolean {
    if (event.preventDefault) {
      event.preventDefault(); // Necessary. Allows us to drop.
    }
    return false;
  }

  @HostListener('drop', ['$event'])
  drop(event): void {
    const selectedElements = this.selectionService.getSelectedElements();
    const element = event.target;
    if (selectedElements.length > 0) {
      selectedElements.forEach((el: Node) => {
        (el as any).classList.remove('placeholder');
        (el as any).classList.remove('selected');
        (el as any).classList.add('dropped');
        timer(500).subscribe(() => (el as any).classList.remove('dropped'));
      });
      this.selectionService.resetSelectedElements();
    } else {
      element.classList.remove('placeholder');
      element.classList.add('dropped');
      timer(500).subscribe(() => element.classList.remove('dropped'));
    }
  }

  @HostListener('click', ['$event'])
  clicked(event): void {
    const element = event.target;
    this.selected = !this.selected;
    this.selected ? element.classList.add(this.SELECTED_CLASS) : element.classList.remove(this.SELECTED_CLASS);
    this.selectionService.updateSelectedDragItem(element, this.selected);
  }
}
