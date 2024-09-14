import './App.scss';
import { useState } from 'react';
import Header from './Header/Header';
import SelectAction from './SelectAction/SelectAction';
import JsonForm from './JsonForm/JsonForm';
import Table from './Table/Table';

export default function App() {
  const [selectedAction, setSelectedAction] = useState('post_entities');
  const handleSelectChange = (value) => {
    setSelectedAction(value);
  };

  return (
    <>
      <Header />
      <SelectAction onSelectChange={handleSelectChange} />
      
      {selectedAction === "post_entities" && <JsonForm />} {/* Форма с отправкой данных */}
      {selectedAction === "get_entities" && <Table />} {/* Таблица с получением данных */}
    </>
  );
}