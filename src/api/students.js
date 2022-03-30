import http from "../util/http";

export function studentsList(params) {
  return http({
    url: "students/studentsList",
    method: "get",
    params,
  });
}
export function queryeThnicDesc() {
  return http({
    url: "students/queryeThnicDesc",
    method: "get",
  });
}
export function queryAgeCount() {
  return http({
    url: "students/queryAgeCount",
    method: "get",
  });
}
export function queryCollegeCount() {
  return http({
    url: "students/queryCollegeCount",
    method: "get",
  });
}
export function queryCount() {
  return http({
    url: "students/queryCount",
    method: "get",
  });
}
export function searchStudents(params) {
  return http({
    url: "students/queryByName",
    method: "get",
    params,
  });
}
export function queryById(params) {
  return http({
    url: "students/queryById",
    method: "get",
    params,
  });
}
export function queryStudentsByClassId(params) {
  return http({
    url: "students/queryByClassId",
    method: "get",
    params,
  });
}
export function queryByHostel(params) {
  return http({
    url: "students/queryByHostel",
    method: "get",
    params,
  });
}
export function addStudentInfo(data) {
  return http({
    url: "students/addStudent",
    method: "post",
    data,
  });
}
export function updateStudentInfo(data) {
  return http({
    url: "students/updateStudentInfo",
    method: "post",
    data,
  });
}
export function deleteStudent(params) {
  return http({
    url: "students/deleteStudent",
    method: "get",
    params,
  });
}
