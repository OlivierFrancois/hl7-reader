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

export const AppContext = createContext<AppContextI>({} as AppContextI);

function App() {
    const messagesLocalStorage: MessageHL7[] | null = localStorage.getItem('hl7_reader')
        ? JSON.parse(localStorage.getItem('hl7_reader') as string)
        : null;

    const [messages, setMessages] = useState<MessageHL7[]>(messagesLocalStorage ? messagesLocalStorage : []);
    const [commonSegmentsAndFields, setCommonSegmentsAndFields] = useState<HL7Segment[]>([] );

    const appContext = {messages, setMessages, commonSegmentsAndFields};

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

    return (
        <AppContext.Provider value={appContext}>
            <List/>

            <Body/>
        </AppContext.Provider>
    )
}

export default App