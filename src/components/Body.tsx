import Header from "./Header.tsx";
import {useContext} from "react";
import {MessageContext} from "../App.tsx";
import PrettyDisplay from "./MessageHL7/PrettyDisplay.tsx";

export default function Body() {
    const {messages} = useContext(MessageContext);

    return <div className={'flex-1 flex flex-col overflow-hidden'}>
        <Header/>

        <div className={'flex-1 flex divide-x overflow-hidden'}>
            {messages.map((message, index) => (
                <div key={index} className={'message-container p-1 flex-1 max-h-full overflow-y-scroll'} id={`message-container-${index}`}>
                    <PrettyDisplay message={message}/>
                </div>
            ))}
        </div>
    </div>
}
