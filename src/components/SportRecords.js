import React, { useState } from 'react';
import { Button } from '@react95/core';

const SportRecords = () => {
  const [records, setRecords] = useState([]);
  const [newSport, setNewSport] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newResult, setNewResult] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  const addRecord = () => {
    if (newSport.trim() && newDate.trim() && newResult.trim()) {
      setRecords([...records, { id: Date.now(), sport: newSport, date: newDate, result: newResult }]);
      clearForm();
    }
  };

  const editRecord = (record) => {
    setIsEditing(true);
    setCurrentRecord(record);
    setNewSport(record.sport);
    setNewDate(record.date);
    setNewResult(record.result);
  };

  const updateRecord = () => {
    setRecords(records.map(record => (
      record.id === currentRecord.id ? { ...record, sport: newSport, date: newDate, result: newResult } : record
    )));
    clearForm();
  };

  const removeRecord = (id) => {
    setRecords(records.filter(record => record.id !== id));
  };

  const clearForm = () => {
    setNewSport('');
    setNewDate('');
    setNewResult('');
    setIsEditing(false);
    setCurrentRecord(null);
  };

  return (
    <div style={{ padding: '10px', display: 'flex', flexDirection: 'column', height: '100%'}}>
     

      <div style={{ height: '300px', overflowY: 'auto', marginBottom: '20px' }}>
        <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
          {records.map(record => (
            <li key={record.id} style={{ marginBottom: '5px' }}>
              <strong>{record.sport}</strong> - {record.result} (Дата: {record.date})
              <Button onClick={() => editRecord(record)} style={{ marginLeft: '10px' }}>
                Редактировать
              </Button>
              <Button onClick={() => removeRecord(record.id)} style={{ marginLeft: '10px' }}>
                Удалить
              </Button>
            </li>
          ))}
        </ul>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '20px' }}>
        <input
          type="text"
          value={newSport}
          onChange={(e) => setNewSport(e.target.value)}
          placeholder="Спорт"
          style={{ marginBottom: '8px', width: '100%' }}
        />
        <input
          type="date"
          value={newDate}
          onChange={(e) => setNewDate(e.target.value)}
          placeholder="Дата"
          style={{ marginBottom: '8px', width: '100%' }}
        />
        <input
          type="text"
          value={newResult}
          onChange={(e) => setNewResult(e.target.value)}
          placeholder="Результат"
          style={{ marginBottom: '8px', width: '100%' }}
        />
        {isEditing ? (
          <Button onClick={updateRecord}>Сохранить изменения</Button>
        ) : (
          <Button onClick={addRecord}>Добавить достижение</Button>
        )}
      </div>
    </div>
  );
};

export default SportRecords;

