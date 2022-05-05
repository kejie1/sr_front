import http from "../util/http";

export function hostelList(params) {
  return http({
    url: "hostel/hostelList",
    method: "get",
    params,
  });
}
export function queryCount() {
  return http({
    url: "hostel/queryCount",
    method: "get",
  });
}
export function queryHostelName(params) {
  return http({
    url: "hostel/queryHostelName",
    method: "get",
    params,
  });
}
export function queryById(params) {
  return http({
    url: "hostel/queryById",
    method: "get",
    params,
  });
}
export function addHostel(data) {
  return http({
    url: "hostel/addHostel",
    method: "post",
    data,
  });
}
export function updateHostel(data) {
  return http({
    url: "hostel/update",
    method: "post",
    data,
  });
}
export function deleteHostel(data) {
  return http({
    url: "hostel/delete",
    method: "post",
    data,
  });
}
