import { Body, Controller, Post } from '@nestjs/common';
import { ReversecapStringDto } from './dto/reversecap-string.dto';
import { StringsService } from './strings.service';

@Controller('strings')
export class StringsController {
    constructor(private stringsService: StringsService) {}

    @Post()
    async revString(@Body() reverseCapDto: ReversecapStringDto): Promise<string> {
        let reversedString = await this.stringsService.getResString(reverseCapDto);
        return JSON.stringify({data: reversedString});
    }
}
