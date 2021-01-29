
const myUrl = 'https://jsonplaceholder.typicode.com/posts';

const sendData = async (url, data) => {
  const response = await fetch(url, {
    method: 'POST',
    body: data,
  });

  if(!response.ok) {
    throw new Error (`Ошибка, статус ${response.status}`)
  }

  return await response.json();
}

export {sendData, myUrl};
