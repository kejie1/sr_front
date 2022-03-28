import http from "../util/http";

export function vocationalList(params) {
  return http({
    url: "vocational/vocationalList",
    method: "get",
    params,
  });
}
export function queryCount() {
  return http({
    url: "vocational/queryCount",
    method: "get",
  });
}
export function queryVocationalStrById(params) {
  return http({
    url: "vocational/queryVocationalStrById",
    method: "get",
    params,
  });
}
export function queryVocationalById(params) {
  return http({
    url: "vocational/queryVocationalById",
    method: "get",
    params,
  });
}
export function queryVocationalByClassId(params) {
  return http({
    url: "vocational/queryByClassId",
    method: "get",
    params,
  });
}
export function addVocational(data) {
  return http({
    url: "vocational/add",
    method: "post",
    data,
  });
}
export function deleteVocational(data) {
  return http({
    url: "vocational/delete",
    method: "post",
    data,
  });
}
export function updateVocational(data) {
  return http({
    url: "vocational/update",
    method: "post",
    data,
  });
}
