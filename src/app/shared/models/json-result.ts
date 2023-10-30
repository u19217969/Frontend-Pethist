export interface JsonResult<TData> {
  success: boolean;
  records: boolean;
  message: string;
  token: string;
  dataListModel: TData;
  dataModel: TData;
  dataPaginado: TData;
}
