// App.js
import React, { useState } from 'react';
import '@react95/core/GlobalStyle';
import '@react95/core/themes/win95.css';
import { Modal, TaskBar, List, TitleBar } from '@react95/core';
import { WindowsExplorer, ReaderClosed, Notepad, Calculator, Mdisp321 } from '@react95/icons';
import TodoList from './components/TodoList';
import Calc from './components/Calc';
import SportRecords from './components/SportRecords';
import SportContent from './components/SportNutrition'; // Импортируем компонент SportContent
import NewContent from './components/NewContent'; // Импортируем новый компонент

const AppModal = ({ isOpen, onClose, title, icon, children }) => (
  isOpen && (
    <Modal
      icon={icon}
      title={title}
      titleBarOptions={[<TitleBar.Close key="close" onClick={onClose} />]}
      width="300px"
      height="400px"
    >
      {children}
    </Modal>
  )
);

function App() {
  const [isFirstOpen, setIsFirstOpen] = useState(false);
  const [isSecondOpen, setIsSecondOpen] = useState(false);
  const [isThirdOpen, setIsThirdOpen] = useState(false);
  const [isFourthOpen, setIsFourthOpen] = useState(false);
  const [isFifthOpen, setIsFifthOpen] = useState(false); // Состояние для нового модального окна

  return (
    <div style={{ backgroundColor: '#00807F', height: '100vh', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ display: 'flex', gap: '20px' }}>
        <div onClick={() => setIsFirstOpen(true)} style={{ cursor: 'pointer', textAlign: 'center' }}>
          <WindowsExplorer variant="32x32_4" />
          <p>Records</p>
        </div>
        <div onClick={() => setIsSecondOpen(true)} style={{ cursor: 'pointer', textAlign: 'center' }}>
          <Calculator variant="32x32_4"/>
          <p>Calculators</p>
        </div>
        <div onClick={() => setIsThirdOpen(true)} style={{ cursor: 'pointer', textAlign: 'center' }}>
          <Mdisp321 variant="32x32_4"/>
          <p>Nutrition</p>
        </div>
        <div onClick={() => setIsFourthOpen(true)} style={{ cursor: 'pointer', textAlign: 'center' }}>
          <Notepad variant="32x32_4" />
          <p>Notepad</p>
        </div>
        <div onClick={() => setIsFifthOpen(true)} style={{ cursor: 'pointer', textAlign: 'center' }}> {/* Новый ярлык */}
          <ReaderClosed variant="32x32_4" />
          <p>Muscle</p>
        </div>
      </div>

      <AppModal isOpen={isFirstOpen} onClose={() => setIsFirstOpen(false)} title="Records" icon={<WindowsExplorer variant="16x16_4" />}>
        <SportRecords />
      </AppModal>

      <AppModal
        isOpen={isSecondOpen}
        onClose={() => setIsSecondOpen(false)}
        title="Calculators"
        icon={<Calculator variant="32x32_4"/>}
      >
        <Calc/>
      </AppModal>

      <AppModal
        isOpen={isThirdOpen}
        onClose={() => setIsThirdOpen(false)}
        title="Nutrition"
        icon={<Mdisp321 variant="32x32_4"/>}
      >
        <SportContent onClose={() => setIsThirdOpen(false)} />
      </AppModal>

      <AppModal
        isOpen={isFourthOpen}
        onClose={() => setIsFourthOpen(false)}
        title="Notepad"
        icon={<Notepad variant="16x16_4" />}
      >
        <TodoList />
      </AppModal>

      {/* Новый модальный компонент */}
      <AppModal
        isOpen={isFifthOpen}
        onClose={() => setIsFifthOpen(false)}
        title="Muscle"
        icon={<ReaderClosed variant="32x32_4" />}
      >
        <NewContent onClose={() => setIsFifthOpen(false)} />
      </AppModal>

      <TaskBar
        list={
          <List>
            <List.Item icon={<WindowsExplorer variant="32x32_4" />} onClick={() => setIsFirstOpen(true)}>
              Records
            </List.Item>
            <List.Item icon={<Calculator variant="32x32_4"/>} onClick={() => setIsSecondOpen(true)}>
              Calculator
            </List.Item>
            <List.Item icon={<Mdisp321 variant="32x32_4"/>} onClick={() => setIsThirdOpen(true)}>
              Nutrition
            </List.Item>
            <List.Item icon={<Notepad variant="32x32_4" />} onClick={() => setIsFourthOpen(true)}>
              Notepad
            </List.Item>
            <List.Item icon={<ReaderClosed variant="32x32_4" />} onClick={() => setIsFifthOpen(true)}> {/* Новый элемент для TaskBar */}
              Muscle
            </List.Item>
          </List>
        }
      />
    </div>
  );
}

export default App;
