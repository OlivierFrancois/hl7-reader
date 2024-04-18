import Header from "./Header.tsx";
import {useContext} from "react";
import {AppContext} from "../App.tsx";
import PrettyDisplay from "./MessageHL7/PrettyDisplay.tsx";

export default function Body() {
    const {messages} = useContext(AppContext);

    return <div className={'flex-1 flex flex-col overflow-hidden'}>
        <Header/>

        <div className={'flex-1 grid grid-cols-2 max-h-full overflow-y-scroll'}>
            {messages.map((message, index) => (
                <div key={index} className={'message-container p-1 flex-1'} id={`message-container-${index}`}>
                    <PrettyDisplay message={message}/>
                </div>
            ))}
        </div>
    </div>
}
