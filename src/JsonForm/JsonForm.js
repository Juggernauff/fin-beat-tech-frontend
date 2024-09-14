import { useState } from 'react';
import styles from './JsonForm.module.scss';

export default function JsonForm() {
    const [jsonInput, setJsonInput] = useState('');
    const [responseMessage, setResponseMessage] = useState('');

    const handleChange = (event) => {
        setJsonInput(event.target.value);
    };

    const handleSubmit = async (event) => {
    event.preventDefault();

    const parsedJson = JSON.parse(jsonInput);

    const response = await fetch('http://localhost:5157/api/v1/Entities', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(parsedJson),
    });

    if (response.ok) {
      setResponseMessage('The data has been sent successfully!');
    } 
    else {
      setResponseMessage('An unexpected error occurred. Please try again later.');
    }
  };


    return (
      <div className={styles.jsonFormContainer}>
        <form onSubmit={handleSubmit}>
          <label htmlFor='jsonInput'>
            Введите JSON:
            <textarea
                id='jsonInput'
                value={jsonInput}
                onChange={handleChange}
                placeholder='[{"code": 0, "value": "value"}]'
            />
          </label>
          <button type="submit">Отправить данные</button>
        </form>

        <p>{responseMessage}</p>
      </div>
    )
}