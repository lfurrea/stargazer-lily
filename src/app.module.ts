import { Module } from '@nestjs/common';
import { StringsModule } from './strings/strings.module';

@Module({
  imports: [StringsModule],
})
export class AppModule {}
