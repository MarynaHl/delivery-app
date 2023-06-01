import Vendors from "./Vendors";
import { Outlet } from "react-router-dom";

export default function Shop() {
  return (
    <>
      <div className="row">
        <div className="col-3">
          <Vendors />
        </div>
        <div className="col-9">
          <Outlet />
        </div>
      </div>
    </>
  );
}
