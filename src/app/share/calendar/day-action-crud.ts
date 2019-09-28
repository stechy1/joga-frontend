import { DayAction } from './day-action';

export interface DayActionCrud {

  /**
   * Založí novou akci pro vybraný den
   *
   * @param date Den, pro který se má založit nová akce
   */
  create?(date: Date): void;

  /**
   * Aktualizuje vybranou akci
   *
   * @param dayAction Akce, která se má aktualizovat
   */
  update?(dayAction: DayAction): void;

  /**
   * Smaže vybranou akci
   *
   * @param dayAction Akce, která se má smazat
   */
  delete?(dayAction: DayAction): void;

  /**
   * Přihlásí klienta na vybranou akci
   *
   * @param dayAction Akce, na kterou se klient hlásí
   */
  assign?(dayAction: DayAction): void;

  /**
   * Odhlásí klienta z akce
   *
   * @param dayAction Akce, ze které se klient odhlašuje
   */
  cancel?(dayAction: DayAction): void;
}
