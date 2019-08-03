import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { computeLinks } from './paginator.util';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit, OnDestroy {

  @Input() totalPages: Observable<number>;

  @Output() curentPage = new BehaviorSubject<number>(1);

  private _paginatorLinks: number[] = [];
  private _totalPages: number;
  private _totalPagesSubscription: Subscription;

  disablePrev: boolean;
  disableNext: boolean;

  constructor() { }

  private _updateLinks(totalPages: number, curentPage: number) {
    this._paginatorLinks = computeLinks(totalPages, curentPage);
    this.disablePrev = curentPage === 1;
    this.disableNext = curentPage === totalPages;
  }

  ngOnInit() {
    this._totalPagesSubscription = this.totalPages.subscribe(value => {
      this._totalPages = value;
      this._updateLinks(value, this.curentPage.getValue());
    });
  }

  ngOnDestroy(): void {
    this._totalPagesSubscription.unsubscribe();
  }

  handleShowPrev() {
    this.handleShow(this.curentPage.getValue() - 1);
  }

  handleShow(index: number) {
    this.curentPage.next(index);
    this._updateLinks(this._totalPages, index);
  }

  handleShowNext() {
    this.handleShow(this.curentPage.getValue() + 1);
  }

  get paginatorLinks(): number[] {
    return this._paginatorLinks;
  }
}
