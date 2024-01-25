import { Box } from "@chakra-ui/react";
import { ChatState } from "../context/ChatProvider";
import { useNavigate } from "react-router-dom";
import SideDrawer from "../components/miscellaneous/sideDrawer";
import ChatBox from "../components/ChatBox";
import MyChat from "../components/MyChat";
import { useState } from "react";
const Chatpage = () => {
  const navigate = useNavigate();
  const { user } = ChatState();
  const [fetchAgain, setFetchAgain] = useState();
  if (!user) navigate("/");

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box
        display="flex"
        justifyContent="space-between"
        w="100%"
        h="92vh"
        p="10px"
      >
        {user && <MyChat fetchAgain={fetchAgain} />}
        {user && (
          <ChatBox fetechAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
};

export default Chatpage;
