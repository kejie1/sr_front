import http from "../util/http";

export function vocationalList() {
  return http({
    url: "vocational/vocationalList",
    method: "get",
  });
}