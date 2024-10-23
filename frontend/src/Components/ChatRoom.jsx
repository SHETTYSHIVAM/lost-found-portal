import React, { useState, useEffect, useRef } from 'react';
import { Send, Moon, Sun } from 'lucide-react';
import ContextMenu from './ContextMenu';
import axios from 'axios';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ChatroomId = () => {
  let {room, otherUser} = useParams()
  const {name} = useAuth()
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState('');
  const [dark, setDark] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [selectedMessageId, setSelectedMessageId] = useState(null);

  const clientRef = useRef(null);

  const handleClick = (event, messageId) => {
    event.preventDefault();
    setCoords({ x: event.pageX, y: event.pageY });
    setSelectedMessageId(messageId);
    setIsVisible(true);
  };

  const handleClickOutside = () => {
    setIsVisible(false);
  };

  const handleSelect = (cmd) => {
    if (selectedMessageId != null) {
      if (cmd === 'delete') {
        axios.get(`http://127.0.0.1:8000/chats/delete/${room}/${selectedMessageId}`)
          .then(() => {
            setMessages(messages.filter(msg => msg.id !== selectedMessageId));
            setIsVisible(false);
          })
          .catch(error => {
            console.error('Error deleting message:', error);
          });
      }
    }
  };

  const darkModeHandler = () => {
    setDark(!dark);
    document.body.classList.toggle('dark');
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/chats/messages/${room}/`);
        const data = await response.data;

        const options = { weekday: 'short', month: 'short', day: 'numeric' };
        let prevDate = Date.now();

        const updatedMessages = data.messages.map((element) => {
          const time = new Date(element.timestamp);
          const isNewDay = time.getDate() !== prevDate;

          const formattedMessage = {
            ...element,
            date: isNewDay ? time.toLocaleDateString('default', options) : null,
            timestamp: time.toLocaleTimeString('default', {
              hour: 'numeric',
              minute: 'numeric',
            }),
          };

          prevDate = time.getDate();
          return formattedMessage;
        });

        setMessages(updatedMessages || []);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();

    clientRef.current = new W3CWebSocket(`ws://127.0.0.1:8000/ws/${room}/`);

    clientRef.current.onopen = () => {
      console.log('WebSocket Client Connected');
    };

    clientRef.current.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data);

      if (dataFromServer) {
        const strTime = new Date(dataFromServer.timestamp);
        dataFromServer.timestamp = strTime.toLocaleTimeString('default', {
          hour: 'numeric',
          minute: 'numeric',
        });

        setMessages((prevMessages) => [
          ...prevMessages,
          {
            id: dataFromServer.id,
            msg: dataFromServer.message,
            name: dataFromServer.sender,
            timestamp: dataFromServer.timestamp,
          },
        ]);
      }
    };

    return () => {
      if (clientRef.current) {
        clientRef.current.close();
      }
    };
  }, [room]);

  const onButtonClicked = (e) => {
    e.preventDefault();
    if (value.trim() && clientRef.current) {
      clientRef.current.send(
        JSON.stringify({
          type: 'message',
          text: value,
          sender: name,
        })
      );
      setValue('');
    }
  };

  return (
    <div className={`flex justify-center items-center min-h-screen ${dark ? 'bg-gray-900' : 'bg-gray-100'}`} onClick={handleClickOutside}>
      <div className="h-screen w-full max-w-xl mx-auto p-4">
        <ContextMenu isVisible={isVisible} coords={coords} onSelect={(cmd) => handleSelect(cmd)} />
        <div className="mt-6">
          <div className="flex flex-row justify-between">
            <div className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-4">{otherUser.username}</div>
            <button onClick={darkModeHandler}>
              {dark ? <Sun /> : <Moon />}
            </button>
          </div>
          <div className="bg-gray-300 dark:bg-gray-800 p-4 h-[75vh] mb-6 shadow-md overflow-y-auto rounded-lg scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300 dark:scrollbar-thumb-gray-700 dark:scrollbar-track-gray-600 scrollbar-thumb-rounded-xl scrollbar-track-rounded-full">
            {messages.map((message) => (
              <div key={message.id}>
                {message.date && (
                  <div className="flex justify-center flex-wrap">
                    <span className="bg-teal-400 rounded-md my-3 px-2 py-1">{message.date}</span>
                  </div>
                )}
                <div
                  onContextMenu={(e) => handleClick(e, message.id)}
                  className={`p-3 mb-3 rounded-xl shadow-lg max-w-xs ${message.name === name
                    ? 'bg-blue-500 dark:bg-teal-500 text-gray-200 dark:text-gray-100 ml-auto rounded-tr-none'
                    : 'bg-zinc-200 dark:bg-gray-700 text-stone-950 dark:text-gray-100 mr-auto rounded-tl-none'
                    }`}
                >
                  <div className={`font-bold text-xs ${message.name === name ? 'text-yellow-200 dark:text-purple-200' : 'text-cyan-950 dark:text-teal-400'}`}>
                    {message.name}
                  </div>
                  <div className="text-sm">{message.msg}</div>
                  <div className="flex justify-end text-xs dark:text-gray-300 text-gray-900 mt-1">
                    {message.timestamp}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={onButtonClicked} className="flex items-center space-x-3">
            <input
              type="text"
              placeholder="Write a message..."
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <Send className="inline-block h-5 w-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatroomId;
