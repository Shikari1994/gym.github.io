import React from 'react';

const TaskIcon = ({ icon, label, onClick }) => (
  <div onClick={onClick} style={{ cursor: 'pointer', textAlign: 'center' }}>
    {icon}
    <p>{label}</p>
  </div>
);

export default TaskIcon;
