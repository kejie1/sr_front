import http from "../util/http";

export function vocationalList() {
  return http({
    url: "vocational/vocationalList",
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
