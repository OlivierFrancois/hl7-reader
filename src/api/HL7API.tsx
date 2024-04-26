import axios from "axios";

interface PayloadSend {
    url: string
    key: string
    hl7_content: string
}

export class HL7API {
    static async sendMessage(payload: PayloadSend): Promise<any> {
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Basic ${payload.key}`
            }
        }
        return axios.post(payload.url, {'hl7_content': payload.hl7_content}, config)
            .then(response => {
                return response
            })

    }
}