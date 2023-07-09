import {useState} from 'react';
import {MapContainer, TileLayer, Marker, Popup, useMapEvents} from 'react-leaflet';

import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {CoordinatesType} from "../../store/types";
import {setCoordinates} from "../../store/mapSlice";
import {Snackbar} from "@mui/material";


const ClickEventHandler = ({handleMapClick}) => {
  useMapEvents({
    click: handleMapClick,
  });

  return null;
};

type TProps = {
  isEditMode: boolean;
}

const Map = ({isEditMode}: TProps) => {
  // const [markers, setMarkers] = useState<TLatLng[]>([]);
  // const [clickedPoint, setClickedPoint] = useState<CoordinatesType>(null);
  const mapObjects = useAppSelector(state => state.map.mapObjects);
  const clickedPointCoordinates = useAppSelector(state => state.map.coordinates);
  const dispatch = useAppDispatch();

  const handleMapClick = (event) => {
    const {lat, lng} = event.latlng;
    dispatch(setCoordinates([lat, lng]));
  };

  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      style={{height: '100vh', width: '100vw'}}
      // onClick={handleMapClick}
      dragging={true}
    >
      {isEditMode && <ClickEventHandler handleMapClick={handleMapClick}/>}
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
      {mapObjects.map((object, index) => (
        <Marker key={index} position={object.coordinates}>
          <Popup>
            <div>{object.header}</div>
            <div>{object.description}</div>
          </Popup>
        </Marker>
      ))}
      {!!clickedPointCoordinates.length && <Marker position={clickedPointCoordinates}/>}

      <Snackbar
        open={!mapObjects.length && !clickedPointCoordinates.length}
        autoHideDuration={10}
        // onClose={handleClose}
        message="Метки не добавлены, добавьте первую!"
        // action={action}
        anchorOrigin={{vertical: 'top', horizontal: 'right'}}
      />
    </MapContainer>
  );
};

export default Map;