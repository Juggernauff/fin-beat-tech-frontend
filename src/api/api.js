export const fetchEntities = async (page, size, filter) => {
  try {
    const minId = filter.minId ? `&minId=${filter.minId}` : "";
    const maxId = filter.maxId ? `&maxId=${filter.maxId}` : "";
    const minCode = filter.minCode ? `&minCode=${filter.minCode}` : "";
    const maxCode = filter.maxCode ? `&maxCode=${filter.maxCode}` : "";
    const value = filter.value ? `&value=${filter.value}` : "";
    const url = `http://localhost:5157/api/v1/Entities?page=${page}&size=${size}${minId}${maxId}${minCode}${maxCode}${value}`;

    const response = await fetch(url);

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(response.statusText);
    }
  } catch (error) {
    console.error("Ошибка при запросе данных:", error);
    throw error;
  }
};

export const sendData = async (parsedJson) => {
  const response = await fetch("http://localhost:5157/api/v1/Entities", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(parsedJson),
  });

  if (response.ok) {
    return "The data has been sent successfully!";
  } else {
    return "An unexpected error occurred. Please try again later.";
  }
};
