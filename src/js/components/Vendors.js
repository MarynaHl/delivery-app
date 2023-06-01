import { useLoaderData } from "react-router-dom";
import Vendor from "./Vendor";

export default function Vendors() {
  const vendors = useLoaderData();

  return (
    <aside className="content-body border rounded text-center px-5 py-2">
      <h2>Shops:</h2>
      <ul className="nav flex-column">
        {vendors.map((vendor) => (
          <Vendor key={vendor.replace(/\s+/g, "")} name={vendor} />
        ))}
      </ul>
    </aside>
  );
}
