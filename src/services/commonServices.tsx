import BaseService from './baseService';

export function getApi(
  endpoint: string,
  params: Record<string, any>,
): Promise<Response> {
  return BaseService.get(endpoint, { params }).then((res) => res?.data);
}

export function postApi(
  endpoint: string,
  payload: Record<string, any>,
): Promise<Response> {
  return BaseService.post(endpoint, payload).then((res) => res?.data);
}
export function putApi(
  endpoint: string,
  payload: Record<string, any>,
): Promise<Response> {
  return BaseService.put(endpoint, payload).then((res) => res?.data);
}
export function deleteApi(
  endpoint: string,
  payload: Record<string, any>,
): Promise<Response> {
  return BaseService.delete(endpoint, payload).then((res) => res?.data);
}
