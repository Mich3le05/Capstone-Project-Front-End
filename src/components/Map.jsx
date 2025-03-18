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
    <LoadScript googleMapsApiKey="AIzaSyAP3e727LkUvu1X-_CC0jNyK1H6n3Frc5g">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={14}>
        <Marker position={center} title="La mia posizione" />
      </GoogleMap>
    </LoadScript>
  )
}

export default Map
