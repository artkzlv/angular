import { IFilter } from '../models/filter.model';
import { HttpParams } from '@angular/common/http';

export const filterAndSort = (filters: IFilter) => {
  let params = new HttpParams();

  if (filters.genre !== '0') {
    params = params.append('id', filters.genre!);
  }

  if (filters.from) {
    params = params.set('from', filters.from);
  }

  if (filters.to) {
    params = params.set('to', filters.to);
  }

  if (filters.sort) {
    params = params.set('sort', filters.sort);
  }

  return params;
};
