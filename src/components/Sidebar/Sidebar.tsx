import s from './Sidebar.module.scss';
import {Button} from "../Buttons/Button";
import {useEffect, useState} from "react";
import {Alert, Autocomplete, Snackbar, TextField} from "@mui/material";
import axios from "axios";
import {OptionType, OptionsType} from "./types";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {addMapObject, setCoordinates} from "../../store/mapSlice";
import {useDispatch} from "react-redux";
import {AppState, MapObjectType} from "../../store/types";
import {coordinatesSelector} from "../../store/selectors";
import {
  getAddressFromCoordinates,
} from "../../utils/getAddressFromCoordinates";

const API_URL = "https://run.mocky.io/v3/6102c1b2-254f-4b7c-addb-67d4df752866";
type TProps = {
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Sidebar = ({setIsSidebarOpen}: TProps) => {
  const [header, setHeader] = useState<OptionType>(null);
  const [description, setDescription] = useState<OptionType>(null);
  const [headerOptions, setHeaderOptions] = useState<OptionsType>([]);
  const [descriptionOptions, setDescriptionOptions] = useState<OptionsType>([]);
  const [address, setAddress] = useState('')
  const [isError, setIsError] = useState(false);

  const dispatch = useAppDispatch()
  const coordinates = useAppSelector(coordinatesSelector);

  useEffect(() => {
    const asyncEffect = async () => {
      try {
        const res = await axios.get(API_URL);
        const {data: {reference}} = res;
        setHeaderOptions(reference.titles);
        setDescriptionOptions(reference.descriptions)

      } catch (err) {
        console.error(err);
      }
    }
    asyncEffect();

  }, [])

  useEffect(() => {
    const fetchAddress = async () => {
      const address = await getAddressFromCoordinates(coordinates);
      setAddress(address);
    };

    fetchAddress();
  }, [coordinates]);


  const handleAddClick = () => {
    if (header && description && coordinates) {
      const newMapObject: MapObjectType = {
        header: header.name,
        description: description.name,
        coordinates: coordinates,
      }
      dispatch(addMapObject(newMapObject))
      dispatch(setCoordinates(null))
      setIsSidebarOpen(false);
    } else {
      setIsError(true);
    }
  }

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setIsError(false);
  };

  return (
    <div className={s.sidebar}>
      <h1>Выберите адрес на карте</h1>
      <div>Адрес: {address}</div>
      <Autocomplete
        value={header}
        onChange={(event, newValue: OptionType) => {
          setHeader(newValue)
        }}
        options={headerOptions}
        getOptionLabel={headerOption => headerOption.name}
        sx={{width: 300}}
        renderInput={(params) => <TextField {...params} label="Заголовок"/>}
      />
      <Autocomplete
        value={description}
        onChange={(event, newValue: OptionType) => {
          setDescription(newValue);
        }}
        options={descriptionOptions}
        getOptionLabel={descriptionOption => descriptionOption.name}
        sx={{width: 300}}
        renderInput={(params) => <TextField {...params} label="Описание"/>}
      />
      <Button text='Добавить' handleClick={handleAddClick}/>

      <Snackbar open={isError} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
          Заполните все поля и выберите адрес
        </Alert>
      </Snackbar>
    </div>
  );
};