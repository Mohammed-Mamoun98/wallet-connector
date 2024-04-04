export interface IRequestState<ResponseType = any> {
  loading: boolean;
  response: ResponseType;
  error: string;
}
