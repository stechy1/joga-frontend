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

  private _totalPagesSubscription: Subscription;

  constructor() { }

  private _updateLinks(totalPages: number, curentPage: number) {
    this._paginatorLinks = computeLinks(totalPages, curentPage);
  }

  ngOnInit() {
    this._totalPagesSubscription = this.totalPages.subscribe(value => this._updateLinks(value, this.curentPage.getValue()));
    // this._paginatorLinks = computeLinks(this.totalPages, this.curentPage.getValue());
    console.log(this.totalPages);
    console.log(this.curentPage.getValue());
  }

  ngOnDestroy(): void {
    this._totalPagesSubscription.unsubscribe();
  }

  handleShowPrev() {
    this.curentPage.next(this.curentPage.getValue() - 1);
  }

  handleShow(index: number) {
    this.curentPage.next(index);
  }

  handleShowNext() {
    this.curentPage.next(this.curentPage.getValue() + 1);
  }

  get paginatorLinks(): number[] {
    return this._paginatorLinks;
  }
}
