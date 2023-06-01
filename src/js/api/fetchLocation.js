import { checkResponseStatus } from "../utils/apiUtils";

export async function fetchLocation(url) {
  let response = await fetch(url);

  return checkResponseStatus(response);
}
