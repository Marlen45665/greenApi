const sendMessage = async ( message, chatId) => {
    const url = `https://api.green-api.com/waInstance1101820143/SendMessage/19a1e285d7af4ea791384a47319af193177ec8466f0c479988`
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
const url = 'https://api.green-api.com/waInstance1101820143/ReceiveNotification/19a1e285d7af4ea791384a47319af193177ec8466f0c479988';
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
const url = `https://api.green-api.com/waInstance1101820143/DeleteNotification/19a1e285d7af4ea791384a47319af193177ec8466f0c479988/${idDel}`;
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
    const url = `https://api.green-api.com/waInstance1101820143/GetChatHistory/19a1e285d7af4ea791384a47319af193177ec8466f0c479988`
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


//79250589069@c.us

//79035817446@c.us