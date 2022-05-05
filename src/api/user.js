import http from "../util/http";
export function login(data) {
  return http({
    url: "users/logins",
    method: "post",
    data,
  });
}
export function userList() {
  return http({
    url: "users/queryAll",
    method: "get",
  });
}
export function queryCount() {
  return http({
    url: "users/queryCount",
    method: "get",
  });
}
export function searchUser(params) {
  return http({
    url: "users/queryByUserName",
    method: "get",
    params,
  });
}
export function addUser(data) {
  return http({
    url: "users/addUser",
    method: "post",
    data,
  });
}
export function updateUser(data) {
  return http({
    url: "users/updateUser",
    method: "post",
    data,
  });
}
export function deleteUser(params) {
  return http({
    url: "users/deleteUser",
    method: "post",
    params,
  });
}
