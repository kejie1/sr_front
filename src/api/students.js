import http from "../util/http";

export function studentsList(params) {
  return http({
    url: "students/studentsList",
    method: "get",
    params
  });
}