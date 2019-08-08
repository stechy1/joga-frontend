import { Injectable, Type } from '@angular/core';
import { ModalComponent } from './modal.component';
import { DialogChildComponent } from './dialog-child.component';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ModalService {

  // Kolekce modálních dialogů
  private _modals: ModalComponent[] = [];

  private _findModal(id: string): ModalComponent {
    return this._modals.filter(x => x.id === id)[0];
  }

  /**
   * Přidá nový modální dialog do správce
   *
   * @param modal Nový modální dialog
   */
  add(modal: ModalComponent) {
    if (modal === undefined) {
      return;
    }

    this._modals.push(modal);
  }

  /**
   * Odstraní modální dialog podle jeho ID
   *
   * @param id ID dialogu, který má být odstraněn
   */
  remove(id: string) {
    this._modals = this._modals.filter(x => x.id !== id);
  }

  setModalView(id: string, view: Type<DialogChildComponent>) {
    this._findModal(id).showComponent = view;
  }

  /**
   * Otevře dialog v read-only režimu
   *
   * @param id ID dialogu, který se má otevřít
   * @param args Nepovinné parametry, které se předají přímo do komponenty v modálním okně
   */
  open(id: string, ...args: any) {
    const modal = this._findModal(id);
    modal.open(args);
  }

  /**
   * Otevře dialog s čekáním na výsledek
   *
   * @param id ID dialogu, který se má otevřít
   * @param args Nepovinné parametry, které se předají přímo do komponenty v modálním okně
   */
  openForResult(id: string, ...args: any): Promise<any> {
    const modal: ModalComponent = this._modals.filter(x => x.id === id)[0];
    return modal.openForResult(args);
  }

  /**
   * Zavře vybraný dialog
   *
   * @param id ID dialogu, který se má zavřít
   */
  close(id: string) {
    const modal: ModalComponent = this._modals.filter(x => x.id === id)[0];
    modal.close();
  }
}
