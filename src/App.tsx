import List from "./components/File/List.tsx";
import Body from "./components/Body.tsx";
import React, {createContext, useEffect, useState} from "react";
import MessageHL7 from "./interfaces/MessageHL7.tsx";

interface AppContextI {
    messages: MessageHL7[],
    setMessages: React.Dispatch<React.SetStateAction<MessageHL7[]>>
    commonSegmentsAndFields: HL7Segment[],
}
interface HL7Segment {
    nom: string,
    fields: number[]
}

const LS_MESSAGES = 'hl7_reader_messages'
export const AppContext = createContext<AppContextI>({} as AppContextI);

function App() {
    const LSmessages: MessageHL7[] | null = localStorage.getItem(LS_MESSAGES)
        ? JSON.parse(localStorage.getItem(LS_MESSAGES) as string)
        : null;
    const [messages, setMessages] = useState<MessageHL7[]>(LSmessages ? LSmessages : []);
    const [commonSegmentsAndFields, setCommonSegmentsAndFields] = useState<HL7Segment[]>([] );

    const appContext = {messages, setMessages, commonSegmentsAndFields};

    useEffect(() => {
        const tmp: Array<HL7Segment> = [];
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