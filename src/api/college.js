import http from "../util/http";
export function collegeList () {
  return http({
    url: "college/collegeList",
    method: "get",
  });
}

export function queryCollegeStrById (params) {
  return http({
    url: "college/queryCollegeStrById",
    method: "get",
    params,
  });
}
export function queryCollegeName (params) {
  return http({
    url: "college/queryCollegeName",
    method: "get",
    params,
  });
}
export function queryCollegeById (params) {
  return http({
    url: "college/queryCollegeById",
    method: "get",
    params,
  });
}
export function addCollege (data) {
  return http({
    url: "college/addCollege",
    method: "post",
    data,
  });
}
export function deleteCollege (data) {
  return http({
    url: "college/deleteCollege",
    method: "post",
    data,
  });
}
export function updateCollege (data) {
  return http({
    url: "college/updateCollege",
    method: "post",
    data,
  });
}
export function queryCollegeByClassId (params) {
  return http({
    url: "college/queryByClassId",
    method: "get",
    params,
  });
}
