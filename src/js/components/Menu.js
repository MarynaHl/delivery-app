import { useLoaderData } from "react-router-dom";
import MenuItem from "./MenuItem";

export default function Menu() {
  const items = useLoaderData();

  return (
    <main className="content-body pe-3">
      <div className="row">
        {items.map((item) => (
          <MenuItem key={item.id} info={item} />
        ))}
      </div>
    </main>
  );
}
