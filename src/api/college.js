import http from "../util/http";
export function collegeList() {
  return http({
    url: "college/collegeList",
    method: "get",
  });
}

export function queryCollegeStrById(params) {
  return http({
    url: "college/queryCollegeStrById",
    method: "get",
    params,
  });
}
