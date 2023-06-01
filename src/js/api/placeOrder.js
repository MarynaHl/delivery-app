import { checkResponseStatus } from "../utils/apiUtils";

export async function placeOrder(order) {
  let response = await fetch("http://fake-store-api.eu-4.evennode.com/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });

  return checkResponseStatus(response);
}
