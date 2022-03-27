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
export function queryCounselorByClassId(params) {
  return http({
    url: "counselor/queryByClassId",
    method: "get",
    params,
  });
}
export function queryByVocationalId(params) {
  return http({
    url: "counselor/queryByVocationalId",
    method: "get",
    params,
  });
}
