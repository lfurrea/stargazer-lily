import { Injectable } from '@nestjs/common';
import { ReversecapStringDto } from './dto/reversecap-string.dto';
import axios from 'axios';

@Injectable()
export class StringsService {
    private readonly CAPS_URL = process.env.CAPS_URL || 'HTTP://API.SHOUTCLOUD.IO/V1/SHOUT';
    constructor() {}

    async getResString(reverseCapDto: ReversecapStringDto): Promise<string> {
        const { data } = reverseCapDto;
        let capString = await this.getCapString(this.reverseString(data));
        console.log(capString);
        return capString;
    }

    private reverseString(str: string): string {
        return str.split("").reverse().join("");
    }

    private async getCapString(str: string): Promise<string> {
        try {
            let res = await axios.post(this.CAPS_URL, {INPUT: str});
            return res.data.OUTPUT;
        } catch (e) {
            console.log(`Error fetching API: ${e}`);
            return e;
        }

    }
}
