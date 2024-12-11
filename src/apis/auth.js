import { HttpCall } from '../http/HttpCall';

export const login = async (data) => {
  return HttpCall('auth/employee/login', 'POST', data, {});
};
export const logout = async () => {
  return HttpCall('auth/employee/logout', 'POST');
};
