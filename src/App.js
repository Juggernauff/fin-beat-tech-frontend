import { useState } from "react";
import Header from "./components/Header/Header";
import SelectAction from "./components/SelectAction/SelectAction";
import JsonForm from "./components/JsonForm/JsonForm";
import Table from "./components/Table/Table";

export default function App() {
  const [selectedAction, setSelectedAction] = useState("post_entities");
  const handleSelectChange = (value) => {
    setSelectedAction(value);
  };

  return (
    <>
      <Header />
      <SelectAction onSelectChange={handleSelectChange} />
      {selectedAction === "post_entities" && <JsonForm />}{""}
      {selectedAction === "get_entities" && <Table />}{""}
    </>
  );
}
