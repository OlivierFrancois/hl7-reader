import MessageHL7 from "../../interfaces/MessageHL7.tsx";
import React, {useContext} from "react";
import {AppContext} from "../../App.tsx";

interface Props {
    message: MessageHL7
}

export default function PrettyDisplay({message}: Props) {
    const {commonSegmentsAndFields} = useContext(AppContext);

    const componentContainerRef = React.createRef<HTMLDivElement>();
    const scrollToClick = (e: React.MouseEvent) => {
        console.log(e)
        return
    }

    return <div ref={componentContainerRef} className="p-3 flex flex-col gap-4 max-w-full">
        <div className="text-bold text-lg">{message.filename}</div>

        <div className={'text-xs h-20 max-w-full overflow-y-scroll border rounded p-2'}>{message.content}</div>

        <div className="border max-w-full">
            <table className={'table table-xs max-w-full'}>
                <thead>
                    <tr>
                        <th>Index</th>
                        <th>Champs</th>
                    </tr>
                </thead>

                <tbody>
                    {commonSegmentsAndFields.map(segment => {
                        const segmentStr = message.content.split('\n').find((f) => f.slice(0, 3) === segment.nom)
                        return <>
                            <tr onClick={scrollToClick} className={'font-semibold bg-slate-200'}>
                                <td colSpan={2}>{segment.nom}</td>
                            </tr>
                            {segment.fields.map(index => {
                                const fieldsStr = segmentStr?.split('|');

                                return <tr key={index}>
                                    <td className={'w-5'}>{index}</td>
                                    <td className={'text-2xs max-w-0 overflow-hidden whitespace-nowrap overflow-ellipsis'}>
                                        {fieldsStr ? fieldsStr[index] : ''}
                                    </td>
                                </tr>
                            })}
                        </>
                    })}
                </tbody>
            </table>
        </div>

    </div>
}