import http from "../util/http";

export function studentsList(params) {
  return http({
    url: "students/studentsList",
    method: "get",
    params
  });
}
export function searchStudents(params){
  return http({
    url:"students/queryByName",
    method:"get",
    params
  })
}