export function checkResponseStatus(response) {
  if (response.status === 200) {
    return response.json();
  } else {
    throw new Error(`${response.status} for ${response.url}`);
  }
}
