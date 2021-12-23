import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { StringsController } from './strings.controller';
import { StringsService } from './strings.service';

@Module({
  imports: [HttpModule],
  controllers: [StringsController],
  providers: [StringsService]
})
export class StringsModule {}
