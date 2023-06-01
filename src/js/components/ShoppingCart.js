import { useRef } from "react";
import ContactForm from "./ContactForm";
import SelectedItems from "./SelectedItems";
import SubmitOrder from "./SubmitOrder";
import "../../css/ShoppingCart.css";

export default function ShoppingCart() {
  const formRef = useRef();

  function handleSubmit() {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  }

  return (
    <div className="ShoppingCart">
      <div className="row">
        <div className="col">
          <div className="border rounded p-3 content-body">
            <ContactForm ref={formRef} />
          </div>
        </div>
        <div className="col">
          <div className="content-body d-flex selected-items">
            <div className="border rounded flex-grow-1 overflow-auto p-3">
              <SelectedItems />
            </div>
            <SubmitOrder onSubmit={handleSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
}
