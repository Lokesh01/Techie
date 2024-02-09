import { Avatar, Box, Typography } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { Message } from "../pages/Chat";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";

function extractCodeFormatString(message: string) {
  // the code in response message is enclosed inside ``` ```
  if (message.includes("```")) {
    const blocks = message.split("```");
    return blocks;
  }
}

function isCodeBlock(str: string) {
  if (
    str.includes("=") ||
    str.includes(";") ||
    str.includes("[") ||
    str.includes("]") ||
    str.includes("{") ||
    str.includes("}") ||
    str.includes("#") ||
    str.includes("//")
  )
    return true;

  return false;
}

const ChaItemt = ({ content, role }: Message) => {
  const messageBlocks = extractCodeFormatString(content);
  const auth = useAuth();
  const splitName = auth?.user?.name.split(" ");

  return role === "assistant" ? (
    <Box
      sx={{
        display: "flex",
        p: 2,
        bgcolor: "#004d5612",
        gap: 2,
        borderRadius: 2,
        my: 1,
      }}
    >
      <Avatar sx={{ ml: 0 }}>
        <img src="openai.png" alt="openai" width={"30px"} />
      </Avatar>
      <Box>
        {!messageBlocks && (
          <Typography sx={{ fontSize: "20px" }}>{content}</Typography>
        )}

        {/* for code blocks */}
        {messageBlocks &&
          messageBlocks.length &&
          messageBlocks.map((block) =>
            isCodeBlock(block) ? (
              <SyntaxHighlighter
                wrapLines={true}
                style={coldarkDark}
                language="javascript"
              >
                {block}
              </SyntaxHighlighter>
            ) : (
              <Typography sx={{ fontSize: "20px" }}>{block}</Typography>
            )
          )}
      </Box>
    </Box>
  ) : (
    <Box
      sx={{
        display: "flex",
        p: 2,
        bgcolor: "#004d56",
        gap: 2,
        borderRadius: 2,
      }}
    >
      <Avatar sx={{ ml: "0", bgcolor: "black", color: "white" }}>
        {splitName ? splitName[0][0] : null}
        {splitName?.length === 2 ? splitName[1][0] : null}
      </Avatar>
      <Box>
        {!messageBlocks && (
          <Typography sx={{ fontSize: "20px" }}>{content}</Typography>
        )}
        {messageBlocks &&
          messageBlocks.length &&
          messageBlocks.map((block) =>
            isCodeBlock(block) ? (
              <SyntaxHighlighter
                wrapLines={true}
                style={coldarkDark}
                language="javascript"
              >
                {block}
              </SyntaxHighlighter>
            ) : (
              <Typography sx={{ fontSize: "20px" }}>{block}</Typography>
            )
          )}
      </Box>
    </Box>
  );
};

export default ChaItemt;

