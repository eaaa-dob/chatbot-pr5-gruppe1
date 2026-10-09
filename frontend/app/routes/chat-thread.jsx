import { useParams } from "react-router";
import { ChatMessages, ChatInput } from "../components/Chat.jsx";
import { useLoaderData } from "react-router";

/**
 * INITIAL THREAD MESSAGES DATA
 *
 * This is placeholder data for any thread.
 * Later, this will be replaced with data fetched from the database.
 */
const defaultMessages = [
  {
    id: 1,
    type: "user",
    content: "This is the user's original message",
  },
  {
    id: 2,
    type: "bot",
    content: "This is the first bot response",
  },
];

export async function clientLoader({ params }) {
  const {threadId} = params;
  console.log("ChatThread Loader: Start", threadId);
  await new Promise((resolve) => setTimeout(resolve, 500));
  console.log("ChatThread Loader: End", threadId);
  return{
    threadId,
    messages:[
      {
        id:1,
        type:"user",
        content:"Hej med dig"
      },
      {
        id:2,
        type:"bot",
        content:"Hej tilbage, fra bot"
      }
    ]
  }
}

/**
 * Chat Thread Route Component
 *
 * This route displays an individual chat conversation thread.
 * Now uses useParams() to access the threadId from the URL!
 *
 * Key concepts:
 * 1. useParams() HOOK: Extracts URL parameters from the route
 * 2. The `messages` state is currently shared among all threads, this will be fixed later.
 */
export default function ChatThread() {
  // Extract the threadId from the URL using useParams()
  const { threadId, messages } = useLoaderData();


  const addMessage = (content) => {
    const newMessage = {
      id: messages.length + 1,
      type: "user",
      content: content,
    };

    setMessages([...messages, newMessage]);
    console.log("New message added:", content);
    console.log("Data mutation here later");
  };

  return (
    <main className="chat-container">
      <div className="chat-thread-header">
        <h2>Conversation Thread #{threadId}</h2>
      </div>
      <ChatMessages messages={messages} />
      <ChatInput onAddMessage={addMessage} />
    </main>
  );
}
