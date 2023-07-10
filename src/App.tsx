import { lazy, useState, Suspense, useCallback } from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Preloader, Sidebar, Button } from './components';
import { Provider } from 'react-redux';
import { store, persistor } from './store/store';
import s from './App.module.scss';
import 'leaflet/dist/leaflet.css';

const Map = lazy(() => import('./components/Map'));

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const handleAddAddressClick = useCallback(() => {
    setIsSidebarOpen(true);
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <div className={s.root}>
          <Suspense fallback={<Preloader />}>
            <Map isEditMode={isSidebarOpen} />
            {!isSidebarOpen && (
              <div className={s.buttonAdd}>
                <Button
                  text='Добавить адрес'
                  handleClick={handleAddAddressClick}
                />
              </div>
            )}
          </Suspense>
          {isSidebarOpen && <Sidebar setIsSidebarOpen={setIsSidebarOpen} />}
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
