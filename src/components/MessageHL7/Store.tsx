import {useContext, useState} from "react";
import {AppContext} from "../../App.tsx";
import MessageHL7 from "../../interfaces/MessageHL7.tsx";

export default function Store({size}: {size: string}) {
    const {messages, setMessages} = useContext(AppContext)

    const [messageContent, setMessageContent] = useState<string>('');
    const [filename, setFilename] = useState<string>('')

    const saveMessage = () => {
        let messageType = '';
        if (messageContent) {
            const msh = messageContent.split('\n')[0];
            messageType = msh?.split('|')[8];
        }
        const newMessage: MessageHL7 = {
            filename: `${filename} - ${messageType}`,
            content: messageContent,
        };
        const messagesTmp = [...messages, newMessage]
        setMessages(messagesTmp);

        localStorage.setItem('hl7_reader', JSON.stringify(messagesTmp));
    }

    return <div className="flex flex-col gap-2 text-neutral">
        <input type="text"
               className={`input input-bordered input-xs input-${size}`}
               value={filename} onChange={(e) => setFilename(e.target.value)}
               placeholder="Nom du fichier"/>

        <textarea onChange={e => setMessageContent(e.target.value)}
                  className={`textarea textarea-bordered textarea-${size}`}
                  placeholder={'Contenu du fichier'}
                  value={messageContent}></textarea>

        <button onClick={saveMessage} className={`btn btn-neutral btn-${size}`}>Ajouter</button>
    </div>
}