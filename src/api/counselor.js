import http from "../util/http";

export function counselorList(params) {
  return http({
    url: "counselor/counselorList",
    method: "get",
    params,
  });
}
export function queryPhoneByName(params) {
  return http({
    url: "counselor/queryPhoneByName",
    method: "get",
    params,
  });
}
