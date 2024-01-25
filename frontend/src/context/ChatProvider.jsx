import { useNavigate } from "react-router-dom";

const { createContext, useContext, useState, useEffect } = require("react");

const chatContext = createContext();

const ChatProvider = ({ children }) => {
  const [user, setUser] = useState(); //accessible by whole app
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]); //empty error so that it doesn't give undefined error
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);
    if (!userInfo) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <chatContext.Provider
      value={{
        user,
        setUser,
        selectedChat,
        setSelectedChat,
        chats,
        setChats,
        notifications,
        setNotifications,
      }}
    >
      {children}
    </chatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(chatContext);
};

export default ChatProvider;
