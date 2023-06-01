import { forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field } from "formik";
import { string, number, object } from "yup";
import { fetchLocation } from "../api/fetchLocation";
import { placeOrder } from "../api/placeOrder";
import GMap from "./GMap";
import { EMPTY_CART, RESET_SELECTED_VENDOR } from "../constants/actionTypes";
import { CENTER } from "../constants/mapLocations";
import { API_KEY } from "../constants/apiKey";

const initialValues = {
  geolocation: CENTER,
  username: "",
  email: "",
  phone: "",
  address: "",
};
const geoApiUrl = "https://maps.googleapis.com/maps/api/geocode/json";

const ContactForm = forwardRef(function ContactForm(props, ref) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const products = cart.map(({ productId, quantity }) => ({
    productId,
    quantity,
  }));

  function handleLocationUpdated(form, { lat, lng }) {
    const url = `${geoApiUrl}?latlng=${lat},${lng}&key=${API_KEY}`;

    form.setFieldValue("geolocation", { lat, lng });

    fetchLocation(url)
      .then(({ results }) => {
        form.setFieldValue("address", results[0].formatted_address);
      })
      .catch(() => alert("Please set coordinates correctly."));
  }

  function handleAddressChange({ target: { value } }, form) {
    if (value) {
      let urlQuery = value
        .replace(/,\s(\d+)/, " $1")
        .replace(/,\s\d{5}$/, "")
        .replace(/\s/g, "+");
      const url = `${geoApiUrl}?address=${urlQuery}&key=${API_KEY}`;

      fetchLocation(url)
        .then(({ results }) => {
          form.setFieldValue("geolocation", results[0].geometry.location);
        })
        .catch(() => alert("Please enter address correctly."));
    }
  }

  function handleSubmit(values, actions) {
    const {
      geolocation: { lat, lng },
    } = values;

    placeOrder({
      ...values,
      ...{ lat, long: lng },
      products,
    })
      .then(() => {
        alert("Order was placed successfully!");
        dispatch({
          type: RESET_SELECTED_VENDOR,
        });
        dispatch({
          type: EMPTY_CART,
        });
        actions.resetForm({
          values: initialValues,
        });
      })
      .catch(() => alert("Try to place order later."));
  }

  return (
    <Formik
      innerRef={ref}
      initialValues={initialValues}
      enableReinitialize={true}
      onSubmit={handleSubmit}
      validationSchema={object().shape({
        username: string().required("Required"),
        email: string().email().required("Required"),
        phone: number().required("Required"),
        address: string().required("Required"),
      })}
    >
      {(props) => {
        const { touched, errors, handleSubmit } = props;
        return (
          <form className="h-100" onSubmit={handleSubmit}>
            <div className="w-100 h-50">
              <Field
                name="geolocation"
                component={GMap}
                onLocationUpdated={handleLocationUpdated}
              />
            </div>
            <div className="mb-1">
              <label htmlFor="username" className="form-label">
                Name
              </label>
              <Field
                id="username"
                name="username"
                placeholder="John Doe"
                className="form-control"
              />
              {errors.username && touched.username && (
                <div className="validation-error">{errors.username}</div>
              )}
            </div>
            <div className="mb-1">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <Field
                id="email"
                name="email"
                placeholder="jdoe@gmail.com"
                className="form-control"
              />
              {errors.email && touched.email && (
                <div className="validation-error">{errors.email}</div>
              )}
            </div>
            <div className="mb-1">
              <label htmlFor="phone" className="form-label">
                Phone
              </label>
              <Field
                id="phone"
                name="phone"
                placeholder="0958761234"
                className="form-control"
              />
              {errors.phone && touched.phone && (
                <div className="validation-error">{errors.phone}</div>
              )}
            </div>
            <div className="mb-1">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <Field name="address">
                {({ field, form }) => (
                  <input
                    type="text"
                    {...field}
                    id="address"
                    className="form-control"
                    onBlur={(e) => handleAddressChange(e, form)}
                    placeholder="Hazova St, 9, L'viv, L'vivs'ka oblast, Ukraine"
                  />
                )}
              </Field>
              {errors.address && touched.address && (
                <div className="validation-error">{errors.address}</div>
              )}
            </div>
          </form>
        );
      }}
    </Formik>
  );
});

export default ContactForm;
