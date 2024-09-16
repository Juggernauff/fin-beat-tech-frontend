import { useState } from "react";
import styles from "./JsonForm.module.scss";
import { sendData } from "../../api/api";

export default function JsonForm() {
  const [jsonInput, setJsonInput] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (event) => {
    setJsonInput(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const parsedJson = JSON.parse(jsonInput);
      const message = await sendData(parsedJson);
      setResponseMessage(message);
    } catch (error) {
      setResponseMessage("Invalid JSON format");
    }
  };

  return (
    <div className={styles.jsonFormContainer}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="jsonInput">
          Введите JSON:
          <textarea
            id="jsonInput"
            value={jsonInput}
            onChange={handleChange}
            placeholder='[{"code": 0, "value": "value"}]'
          />
        </label>
        <button type="submit">Отправить данные</button>
      </form>

      <p>{responseMessage}</p>
    </div>
  );
}
