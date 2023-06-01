import { json } from "react-router-dom";

const vendorsLoader = async () => {
  try {
    let response = await fetch(
      "https://fake-store-api.eu-4.evennode.com/products/categories"
    );
    let vendors = await response.json();

    return vendors.reverse();
  } catch (e) {
    throw json(
      { message: "Error occured while fetching vendors" },
      { status: e.status }
    );
  }
};

export default vendorsLoader;
