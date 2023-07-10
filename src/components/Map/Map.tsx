import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from 'react-leaflet';
import { Snackbar } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setCoordinates } from '../../store/mapSlice';

const ClickEventHandler = ({ handleMapClick }) => {
  useMapEvents({
    click: handleMapClick,
  });

  return null;
};

type TProps = {
  isEditMode: boolean;
};

const Map = ({ isEditMode }: TProps) => {
  const mapObjects = useAppSelector(state => state.map.mapObjects);
  const clickedPointCoordinates = useAppSelector(
    state => state.map.coordinates
  );
  const dispatch = useAppDispatch();

  const handleMapClick = (event: { latlng: { lat: number; lng: number } }) => {
    const { lat, lng } = event.latlng;
    dispatch(setCoordinates([lat, lng]));
  };

  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      style={{ height: '100vh', width: '100vw' }}
      onClick={handleMapClick}
      dragging={true}
    >
      {isEditMode && <ClickEventHandler handleMapClick={handleMapClick} />}
      <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
      {mapObjects.map((object, index) => (
        <Marker key={index} position={object.coordinates}>
          <Popup>
            <div>{object.header}</div>
            <div>{object.description}</div>
          </Popup>
        </Marker>
      ))}
      {!!clickedPointCoordinates.length && (
        <Marker position={clickedPointCoordinates} />
      )}

      <Snackbar
        open={!mapObjects.length && !clickedPointCoordinates.length}
        autoHideDuration={10}
        // onClose={handleClose}
        message='Метки не добавлены, добавьте первую!'
        // action={action}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      />
    </MapContainer>
  );
};

export default Map;
