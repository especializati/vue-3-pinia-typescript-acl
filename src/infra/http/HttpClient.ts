export default interface HttpClient {
  get(url: string, configs?: object): Promise<any>;
  post(url: string, body: object, configs?: object): Promise<any>;
  put(url: string, body: object, configs?: object): Promise<any>;
  delete(url: string, configs?: object): Promise<any>;
  withAuthorization(): this;
}
