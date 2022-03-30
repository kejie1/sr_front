import http from "../util/http";

export function counselorList(params) {
  return http({
    url: "counselor/counselorList",
    method: "get",
    params,
  });
}
export function queryCount() {
  return http({
    url: "counselor/queryCount",
    method: "get",
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
export function addCounselor(data) {
  return http({
    url: "counselor/add",
    method: "post",
    data,
  });
}
export function deleteCounselor(data) {
  return http({
    url: "counselor/delete",
    method: "post",
    data,
  });
}
export function updateCounselor(data) {
  return http({
    url: "counselor/update",
    method: "post",
    data,
  });
}
