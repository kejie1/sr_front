import http from "../util/http";
export function login(data) {
  return http({
    url: "users/logins",
    method: "post",
    data,
  });
}

export function getInfo(token) {
  return http({
    url: "/vue-element-admin/user/info",
    method: "get",
    params: { token },
  });
}

export function logout() {
  return http({
    url: "/vue-element-admin/user/logout",
    method: "post",
  });
}
