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

export async function clientLoader({params}) {

  await new Promise((resolve) => setTimeout(resolve,500));

  const mockMessages = [
    {
      id:1, 
      type: "user",
      content: `This is a message in thread ${params.threadId}`,
    },
    {
      id:2, 
      type: "bot",
      content: `This is the bots response in thread ${params.threadId}`,
    }
  ];

  return{
    threadId: params.threadId,
    messages: mockMessages,
  };
};


export default function ChatThread() {
  // Extract the threadId from the URL using useParams()
  const { threadId, messages } = useLoaderData();

    const addMessage = (content) => {
      console.log("message submitted:", content);
      console.log("data mutations will be iplemented in the next phase)");
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
