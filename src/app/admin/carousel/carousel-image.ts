import { BehaviorSubject, Observable } from 'rxjs';

export interface ICarouselImage {
  id: string;
  name: string;
  description: string;
  path: string;
  enabled: number;
  view_order: number;
}

export class CarouselImage {

  private readonly _id: BehaviorSubject<string>;
  private readonly _name: BehaviorSubject<string>;
  private readonly _description: BehaviorSubject<string>;
  private readonly _path: BehaviorSubject<string>;
  private readonly _enabled: BehaviorSubject<boolean>;
  private readonly _view_order: BehaviorSubject<number>;

  constructor(image: ICarouselImage) {
    this._id = new BehaviorSubject<string>(image.id);
    this._name = new BehaviorSubject<string>(image.name);
    this._description = new BehaviorSubject<string>(image.description);
    this._path = new BehaviorSubject<string>(image.path);
    this._enabled = new BehaviorSubject<boolean>(image.enabled !== 0);
    this._view_order = new BehaviorSubject<number>(image.view_order);
  }

  get id(): Observable<string> {
    return this._id;
  }

  setId(value: string) {
    this._id.next(value);
  }

  get name(): Observable<string> {
    return this._name;
  }

  setName(value: string) {
    this._name.next(value);
  }

  get description(): Observable<string> {
    return this._description;
  }

  setDescription(value: string) {
    this._description.next(value);
  }

  get path(): Observable<string> {
    return this._path;
  }

  setPath(value: string) {
    this._path.next(value);
  }

  get enabled(): Observable<boolean> {
    return this._enabled;
  }

  setEnabled(value: boolean) {
    this._enabled.next(value);
  }

  get view_order(): Observable<number> {
    return this._view_order;
  }

  setView_order(value: number) {
    this._view_order.next(value);
  }

  toCarouselImage(): ICarouselImage {
    return {
      id : this._id.getValue(),
      name : this._name.getValue(),
      description : this._description.getValue(),
      path : this._path.getValue(),
      enabled : this._enabled.getValue() ? 1 : 0,
      view_order : this._view_order.getValue(),
    };
  }
}
