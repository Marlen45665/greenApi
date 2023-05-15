let _IDINSTANCE = 1101820143;
let _APITOCENINSTANCE = '19a1e285d7af4ea791384a47319af193177ec8466f0c479988';

const sendMessage = async ( message, chatId) => {
    const url = `https://api.green-api.com/waInstance${_IDINSTANCE}/SendMessage/${_APITOCENINSTANCE}`
    const data = {
        chatId: chatId,
        message: message
    };
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(data),
    };
    try {
      const response = await fetch(url, options);
      const json = await response.json();
      return json;
    } catch (error) {
      console.error(error);
    }
};
  

const getMessages = async () => {
const url = `https://api.green-api.com/waInstance${_IDINSTANCE}/ReceiveNotification/${_APITOCENINSTANCE}`;
const options = {
    method: 'GET',
    headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    },
};
try {
    const response = await fetch(url, options);
    const json = await response.json();
    return json;
} catch (error) {
    console.error(error);
}
};


const delMessages = async (idDel) => {
const url = `https://api.green-api.com/waInstance${_IDINSTANCE}/DeleteNotification/${_APITOCENINSTANCE}/${idDel}`;
const options = {
    method: 'DELETE',
    headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    },
};
try {
    const response = await fetch(url, options);
    const json = await response.json();
    return json;
} catch (error) {
    console.error(error);
}
};


const jurnals = async (chatId) => {
    const url = `https://api.green-api.com/waInstance${_IDINSTANCE}/GetChatHistory/${_APITOCENINSTANCE}`
    const data = {
        chatId: chatId,
        count: 20
    };
    const options = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(data),
    };
    try {
        const response = await fetch(url, options);
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
    }
};


export { sendMessage, getMessages, delMessages, jurnals };
