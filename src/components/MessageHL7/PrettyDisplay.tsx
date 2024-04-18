import MessageHL7 from "../../interfaces/MessageHL7.tsx";
import React from "react";

interface Props {
    message: MessageHL7
}

export default function PrettyDisplay({message}: Props) {

    const componentContainerRef = React.createRef<HTMLDivElement>();
    const scrollToClick = (e: React.MouseEvent) => {
        const componentContainer = componentContainerRef.current;
        if (!componentContainer) return;

        const messageContainer = componentContainer.closest('.message-container') as HTMLDivElement;
        if (!messageContainer) return;
        const scrollToY = e.screenY;
        console.log(scrollToY);
        messageContainer.scrollTo({top: scrollToY, behavior: "smooth"});
    }

    return <div ref={componentContainerRef} className="p-3 flex flex-col gap-4">
        <div className="text-bold text-lg">{message.filename}</div>

        <div className={'text-xs h-20 max-w-full overflow-y-scroll border rounded p-2'}>{message.content}</div>

        <table className={'table table-xs border'}>
            <thead>
                <tr>
                    <th>Index</th>
                    <th>Champs</th>
                </tr>
            </thead>

            <tbody>
                {message.content.split("\n").map(segment => (
                    segment.split('|').map((champs, index) => {
                        return (<tr key={index}>
                            {index === 0
                                ? <td onClick={scrollToClick} colSpan={2} className={'font-semibold bg-slate-200'}>{champs}</td>
                                : <><td className={'w-5'}>{index}</td>
                                <td>{champs}</td></>
                            }
                        </tr>)
                    })
                ))}
            </tbody>
        </table>

    </div>
}