import List from "./components/File/List.tsx";
import Body from "./components/Body.tsx";
import React, {createContext, useState} from "react";
import MessageHL7 from "./interfaces/MessageHL7.tsx";

interface MessageContextI {
    messages: MessageHL7[],
    setMessages: React.Dispatch<React.SetStateAction<MessageHL7[]>>
}

export const MessageContext = createContext<MessageContextI>({} as MessageContextI);

function App() {
    const messagesLocalStorage: MessageHL7[] | null = localStorage.getItem('hl7_reader')
        ? JSON.parse(localStorage.getItem('hl7_reader') as string)
        : null;

    const [messages, setMessages] = useState<MessageHL7[]>(messagesLocalStorage ? messagesLocalStorage : []);
    const messageContext = {messages, setMessages};

    return (
        <MessageContext.Provider value={messageContext}>
            <List/>

            <Body/>
        </MessageContext.Provider>
    )
}

export default App