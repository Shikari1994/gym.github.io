// components/MuscleGroup.js
import React from 'react';
import { Modal, TitleBar } from '@react95/core';

const MuscleGroup = ({ isOpen, onClose, title, exercises }) => (
  isOpen && (
    <Modal
      title={title}
      titleBarOptions={[<TitleBar.Close key="close" onClick={onClose} />]}
      width="300px"
      height="400px"
    >
      <div style={{ padding: '10px' }}>
        <h3>{title}</h3>
        <p>{exercises}</p>
      </div>
    </Modal>
  )
);

export default MuscleGroup;
