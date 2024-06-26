import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  deleteUserChats,
  getUserChats,
  sendChatRequest,
} from "../utils/apiReqHandler";
import { Avatar, Box, Button, IconButton, Typography } from "@mui/material";
import { ChatItem } from "../components";
import { IoMdSend } from "react-icons/io";
import { red } from "@mui/material/colors";
import toast from "react-hot-toast";

export type Message = {
  role: "user" | "assistant";
  content: string;
};

const Chat = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const auth = useAuth();
  const splitName = auth?.user?.name.split(" "); // converting the name string to array
  const [chatMessages, setChatMessages] = useState<Message[]>([]);

  const handleSubmit = async () => {
    const content = inputRef.current?.value as string;
    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }
    const newMessage: Message = { role: "user", content };
    setChatMessages((prev) => [...prev, newMessage]);
    const chatData = await sendChatRequest(content);
    setChatMessages([...chatData.chats]);
  };

  const handleDeleteChats = async () => {
    try {
      toast.loading("Deleting chats....", { id: "deleteChats" });
      await deleteUserChats();
      setChatMessages([]);
      toast.success("Chats deleted successfullly", { id: "deleteChats" });
    } catch (error) {
      console.log(error);
      toast.error("Unable to delete chats", { id: "deleteChats" });
    }
  };

  useLayoutEffect(() => {
    if (auth?.isLoggedIn && auth?.user) {
      toast.loading("loading chats ...", { id: "loadChats" });
      getUserChats()
        .then((data) => {
          setChatMessages([...data.chats]);
          toast.success("successfully loaded chats", { id: "loadChats" });
        })
        .catch((error) => {
          console.log(error);
          toast.error("Loading failed!", { id: "loadChats" });
        });
    }
  }, [auth]);

  // to check if token has expired
  useEffect(() => {
    if (!auth?.user) {
      return navigate("/login");
    }
  }, [auth]);

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        width: "100%",
        height: "100%",
        mt: 3,
        gap: 3,
      }}
    >
      <Box
        sx={{
          display: {
            md: "flex",
            xs: "none",
            sm: "none",
          },
          flex: 0.2,
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "60vh",
            bgcolor: "rgb(17,29,39)",
            borderRadius: 5,
            flexDirection: "column",
            mx: 3,
          }}
        >
          <Avatar
            sx={{
              mx: "auto",
              my: 2,
              bgcolor: "white",
              color: "black",
              fontWeight: 700,
            }}
          >
            {/* picking first letter of firstName */}
            {splitName ? splitName[0][0] : null}
            {/* picking 1 letter of last name */}
            {splitName?.length === 2 ? splitName[1][0] : null}
          </Avatar>
          <Typography sx={{ mx: 2, fontFamily: "work sans" }}>
            Hi 👋! I am Techie an AI Chat Assistant
          </Typography>
          <Typography sx={{ mx: 1, fontFamily: "work sans", my: 2, p: 1 }}>
            You can ask some questions related to Knowledge, Business, Advices,
            Education, etc. But please avoid sharing personal information
          </Typography>
          <Button
            onClick={handleDeleteChats}
            sx={{
              width: "200px",
              my: "auto",
              color: "white",
              fontWeight: "700",
              borderRadius: 3,
              mx: "auto",
              bgcolor: red[300],
              ":hover": {
                bgcolor: red.A400,
              },
            }}
          >
            Clear Conversation
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flex: { xl: 0.8, lg: 0.8, md: 0.8, xs: 1, sm: 1 },
          flexDirection: "column",
          px: 3,
        }}
      >
        <Typography
          sx={{
            fontSize: "40px",
            color: "white",
            mb: 2,
            mx: "auto",
            fontWeight: "600",
          }}
        >
          Model - GPT 3.5 Turbo
        </Typography>
        <Box
          sx={{
            width: "100%",
            height: "60vh",
            borderRadius: 3,
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            overflow: "scroll",
            overflowX: "hidden",
            overflowY: "auto",
            scrollBehavior: "smooth",
          }}
        >
          {chatMessages.map((chat, index) => (
            <ChatItem content={chat.content} role={chat.role} key={index} />
          ))}
        </Box>

        <div
          style={{
            width: "100%",
            borderRadius: 8,
            backgroundColor: "rgb(17,27,39)",
            display: "flex",
            margin: "auto",
          }}
        >
          <input
            type="text"
            ref={inputRef}
            style={{
              width: "100%",
              backgroundColor: "transparent",
              padding: "30px",
              border: "none",
              outline: "none",
              color: "white",
              fontSize: "20px",
            }}
          />
          <IconButton onClick={handleSubmit} sx={{ color: "white", mx: 1 }}>
            <IoMdSend />
          </IconButton>
        </div>
      </Box>
    </Box>
  );
};

export default Chat;
