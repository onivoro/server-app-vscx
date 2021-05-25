
import { filter } from 'rxjs/operators';
import { IAction } from '../interfaces/action.interface';

export function ofType({ type }: IAction) {
  return filter((a: any) => {
    return a.type === type;
  });
}
