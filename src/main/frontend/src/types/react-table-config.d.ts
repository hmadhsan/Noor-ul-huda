/*
This will not be required when version 8 is released
https://github.com/tannerlinsley/react-table/issues/1591#issuecomment-729945218

Temporary workaround for version 7
*/
import {
  UsePaginationOptions,
  UsePaginationInstanceProps,
  UsePaginationState,
  UseGlobalFiltersInstanceProps,
  UseGlobalFiltersOptions,
  UseGlobalFiltersState
} from "react-table"

declare module "react-table" {
  export interface Column<D extends object = {}> extends UseSortByColumnOptions<D> {}

  export interface ColumnInstance<D extends object = {}> extends UseSortByColumnProps<D> {}

  export interface TableOptions<D extends object>
    extends UsePaginationOptions<D>,
      UseSortByOptions<D>,
      UseGlobalFiltersOptions<D> {}

  export interface TableState<D extends object = {}>
    extends UsePaginationState<D>,
      UseSortByState<D>,
      UseGlobalFiltersState<D> {}

  export interface TableInstance<D extends object = {}>
    extends UsePaginationInstanceProps<D>,
      UseSortByInstanceProps<D>,
      UseGlobalFiltersInstanceProps<D> {}
}
