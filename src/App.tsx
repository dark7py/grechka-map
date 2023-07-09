import {PersistGate} from 'redux-persist/integration/react';
import {lazy, useState, Suspense, useCallback} from 'react'
import s from './App.module.scss'

import {Preloader, Sidebar} from './components'

const Map = lazy(() => import('./components/Map'));
import "leaflet/dist/leaflet.css";
import {Provider} from "react-redux";
import {store, persistor} from "./store/store";
import {Button} from "./components/Buttons/Button";


function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const handleAddAddressClick = useCallback(() => {
    setIsSidebarOpen(true);
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <div className={s.root}>
          <Suspense fallback={<Preloader/>}>
            <Map isEditMode={isSidebarOpen}/>
            {!isSidebarOpen &&
                <div className={s.buttonAdd}>
                    <Button text='Добавить адрес' handleClick={handleAddAddressClick}/>
                </div>
            }
          </Suspense>
          {isSidebarOpen && <Sidebar setIsSidebarOpen={setIsSidebarOpen}/>}
        </div>
      </PersistGate>
    </Provider>
  )
}

function Loading() {
  return <h2>🌀 Loading...</h2>;
}

export default App