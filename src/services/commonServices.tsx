import BaseService from './baseService';

export async function getApi<T = any>(
  endpoint: string,
  params: Record<string, any> = {},
): Promise<T> {
  const response = await BaseService.get<T>(endpoint, { params });
  return response?.data;
}

export async function postApi<T = any>(
  endpoint: string,
  payload: Record<string, any>,
): Promise<T> {
  const response = await BaseService.post<T>(endpoint, payload);
  return response?.data;
}

export function putApi<T = any>(
  endpoint: string,
  payload: Record<string, any>,
): Promise<T> {
  return BaseService.put<T>(endpoint, payload);
}

export function deleteApi<T = any>(
  endpoint: string,
  payload: Record<string, any>,
): Promise<T> {
  return BaseService.delete<T>(endpoint, { data: payload });
}
