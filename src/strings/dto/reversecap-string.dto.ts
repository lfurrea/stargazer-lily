import { IsNotEmpty } from 'class-validator'

export class ReversecapStringDto {
    @IsNotEmpty()
    data: string;
}
