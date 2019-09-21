import { CRUDServiceType } from './crud-service-type';

export interface ChangeServiceEvent<T> {
  record: T;
  changeType: CRUDServiceType;
}

//  private _changeServiceEventHandler(event: ChangeServiceEvent<LectureType>) {
//     if (event === null) {
//       return
//     }
//
//     switch (event.changeType) {
//       case CRUDServiceType.INSERT:
//         break;
//       case CRUDServiceType.UPDATE:
//         break;
//       case CRUDServiceType.DELETE:
//         break;
//     }
//   }
