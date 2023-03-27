function fetchService(url, method, jwt = undefined, body = undefined) {
  let fetchParam = {
    headers: { "Content-Type": "application/json" },
    method: method,
  };
  if (jwt) fetchParam.headers.Authorization = `Bearer ${jwt}`;
  if (body) fetchParam.body = JSON.stringify(body);
  return fetch(url, fetchParam).then((response) => {
    if (response.status === 200) return response.json();
  });
}
export default fetchService;
