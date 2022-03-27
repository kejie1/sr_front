import http from "../util/http";
export function classList (params) {
  return http({
    url: "class/classList",
    method: "get",
    params
  });
}
export function queryCount () {
  return http({
    url: "class/queryCount",
    method: "get",
  });
}
export function queryClassStrById (params) {
  return http({
    url: "class/queryClassStrById",
    method: "get",
    params,
  });
}
export function queryVocationalById (params) {
  return http({
    url: "class/queryVocationalById",
    method: "get",
    params,
  });
}
export function addClass (data) {
  return http({
    url: "class/add",
    method: "post",
    data,
  });
}
export function deleteClass (data) {
  return http({
    url: "class/delete",
    method: "post",
    data,
  });
}
export function updateClass (data) {
  return http({
    url: "class/update",
    method: "post",
    data,
  });
}