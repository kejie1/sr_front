import http from "../util/http";
export function collegeList() {
  return http({
    url: "college/collegeList",
    method: "get",
  });
}
