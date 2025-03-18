import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'

const containerStyle = {
  width: '90%',
  height: '550px',
}

const center = {
  lat: 38.099449157714844,
  lng: 15.210713386535645,
}

const Map = () => {
  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={14}>
        <Marker position={center} title="La mia posizione" />
      </GoogleMap>
    </LoadScript>
  )
}

export default Map
