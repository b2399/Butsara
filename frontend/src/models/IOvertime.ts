import { DoctorsInterface } from "./IDoctor";
import { ActivitiesInterface } from "./IActivity";
import { WorkplacesInterface } from "./IWorkplace";

export interface OvertimeInterface {
  ID?: number;
  Num: number;
  Time: Date | null;
  DoctorID?: number;
  Doctor?: DoctorsInterface;
  ActivityID?: number;
  Activity?: ActivitiesInterface;
  WorkplaceID?: number;
  Workplace?: WorkplacesInterface;
}