import http from "../util/http";

export function hostelList(params) {
  return http({
    url: "hostel/hostelList",
    method: "get",
    params,
  });
}
export function queryHostelName(params) {
  return http({
    url: "hostel/queryHostelName",
    method: "get",
    params,
  });
}
