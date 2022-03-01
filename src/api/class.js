import http from "../util/http";
export function collegeList() {
  return http({
    url: "class/collegeList",
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