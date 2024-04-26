import List from "./components/File/List.tsx";
import Body from "./components/Body.tsx";
import React, {createContext, useEffect, useState} from "react";
import MessageHL7 from "./interfaces/MessageHL7.tsx";

interface AppContextI {
    messages: MessageHL7[],
    setMessages: React.Dispatch<React.SetStateAction<MessageHL7[]>>
    commonSegmentsAndFields: HL7Segment[],
    apiUrl: string,
    setApiUrl: React.Dispatch<React.SetStateAction<string>>
    apiKey: string,
    setApiKey: React.Dispatch<React.SetStateAction<string>>
}
interface HL7Segment {
    nom: string,
    fields: number[]
}

const LS_MESSAGES = 'hl7_reader_messages'
const LS_API_KEY = 'hl7_reader_api_key'
const LS_API_URL = 'hl7_reader_api_url'
export const AppContext = createContext<AppContextI>({} as AppContextI);

function App() {
    const LSmessages: MessageHL7[] | null = localStorage.getItem(LS_MESSAGES)
        ? JSON.parse(localStorage.getItem(LS_MESSAGES) as string)
        : null;
    const apiKeyLS: string = localStorage.getItem(LS_API_KEY)
        ? localStorage.getItem(LS_API_KEY) as string
        : '';
    const apiUrlLS: string = localStorage.getItem(LS_API_URL)
        ? localStorage.getItem(LS_API_URL) as string
        : '';

    const [messages, setMessages] = useState<MessageHL7[]>(LSmessages ? LSmessages : []);
    const [apiKey, setApiKey] = useState<string>(apiKeyLS)
    const [apiUrl, setApiUrl] = useState<string>(apiUrlLS)
    const [commonSegmentsAndFields, setCommonSegmentsAndFields] = useState<HL7Segment[]>([] );

    const appContext = {messages, setMessages, commonSegmentsAndFields, apiUrl, setApiUrl, apiKey, setApiKey};

    useEffect(() => {
        const tmp: any[] = [];
        // Récupérer tous les segments
        messages.map(message => {
            message.content.split('\n').map(segmentStr => {
                const segmentName = segmentStr.split('|')[0];
                if (segmentName === '') return;

                let segment = tmp.find(segment => segment.nom === segmentName);
                if (!segment) {
                    segment = {nom: segmentName, fields: []} as HL7Segment
                    tmp.push(segment);
                }
                segmentStr.split('|').map((field, index) => {
                    if(field !== '' && segment.fields.indexOf(index) === -1) {
                        segment.fields.push(index);
                    }
                })
            })
        })

        setCommonSegmentsAndFields(tmp);
    }, [messages]);

    useEffect(() => {
        localStorage.setItem(LS_API_KEY, apiKey)
        localStorage.setItem(LS_API_URL, apiUrl)
    }, [apiKey, apiUrl]);
    useEffect(() => {
        localStorage.setItem(LS_MESSAGES, JSON.stringify(messages));
    }, [messages]);

    return (
        <AppContext.Provider value={appContext}>
            <List/>

            <Body/>
        </AppContext.Provider>
    )
}

export default App