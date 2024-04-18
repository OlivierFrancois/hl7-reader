import Store from "../MessageHL7/Store.tsx";
import {MessageContext} from "../../App.tsx";
import {useContext} from "react";
import MessageHL7 from "../../interfaces/MessageHL7.tsx";

export default function List() {
    const {messages, setMessages} = useContext(MessageContext);

    const removeMessage = (message: MessageHL7) => {
        const index = messages.indexOf(message);
        if (index !== -1) {
            const updatedMessages = [...messages.slice(0, index), ...messages.slice(index + 1)];
            setMessages(updatedMessages);
        }
    }

    return <div className={'h-full w-72 bg-slate-600 text-slate-50 border-r shadow flex flex-col gap-5 p-4'}>

        <div className="font-medium">Importer un message</div>

        <Store size={'sm'}/>

        <hr/>

        <div className="flex flex-col gap-1">
            {messages.map((message, k) => <div key={k} className={'border border-slate-700 bg-slate-500 rounded py-1 px-3 flex justify-between items-center'}>
                <div>{message.filename}</div>

                <div className={'btn btn-ghost btn-xs'} onClick={() => removeMessage(message)}>X</div>
            </div>)}
        </div>

    </div>
}