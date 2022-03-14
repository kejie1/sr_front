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
export function queryById(params){
  return http({
    url:"students/queryById",
    method:"get",
    params
  })
}
export function addStudentInfo(data){
  return http({
    url:"students/addStudent",
    method:"post",
    data
  })
}
export function updateStudentInfo(data){
  return http({
    url:"students/updateStudentInfo",
    method:"post",
    data
  })
}