// src/components/AppModal.js

import React from 'react';
import { Modal, TitleBar } from '@react95/core';

const AppModal = ({ isOpen, onClose, title, icon, children }) => (
  isOpen && (
    <Modal
      icon={icon}
      title={title}
      titleBarOptions={[<TitleBar.Close key="close" onClick={onClose} />]}
      width="300px"
      height="400px"
      style={{ overflow: 'hidden' }} // Скрываем переполнение
    >
      <div style={{ maxHeight: '300px', overflowY: 'auto', padding: '10px' }}>
        {children}
      </div>
    </Modal>
  )
);

export default AppModal;
