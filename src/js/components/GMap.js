import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";
import { useSelector } from "react-redux";
import { CENTER, VENDORS_LOCATIONS } from "../constants/mapLocations";
import Spinner from "./Spinner";
import { API_KEY } from "../constants/apiKey";

export default function GMap({ field: { value }, form, onLocationUpdated }) {
  const selectedVendor = useSelector((state) => state.selectedVendor);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: API_KEY,
  });

  function handleMarkerDragEnd({ latLng }) {
    onLocationUpdated(form, { lat: latLng.lat(), lng: latLng.lng() });
  }

  return (
    <div className="GMap w-100 h-100">
      {isLoaded ? (
        <GoogleMap
          mapContainerClassName="h-100 w-100"
          center={CENTER}
          zoom={12}
        >
          <MarkerF
            position={value}
            draggable={true}
            onDragEnd={handleMarkerDragEnd}
            icon={
              "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
            }
          />
          {selectedVendor ? (
            <MarkerF position={VENDORS_LOCATIONS[selectedVendor]} />
          ) : null}
        </GoogleMap>
      ) : (
        <Spinner />
      )}
    </div>
  );
}
