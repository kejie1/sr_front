import http from "../util/http";
export function collegeList() {
  return http({
    url: "college/collegeList",
    method: "get",
  });
}

export function studentsList(params) {
  return http({
    url: "students/studentsList",
    method: "get",
    params
  });
}