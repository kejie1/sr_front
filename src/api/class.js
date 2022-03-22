import http from "../util/http";
export function classList() {
  return http({
    url: "class/classList",
    method: "get",
  });
}
export function queryClassStrById(params) {
  return http({
    url: "class/queryClassStrById",
    method: "get",
    params,
  });
}
export function queryVocationalById(params) {
  return http({
    url: "class/queryVocationalById",
    method: "get",
    params,
  });
}
