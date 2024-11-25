import { Module } from '@nestjs/common';
import { EnergiaDecodingService } from './energy-decoding.service';

@Module({
  providers: [EnergiaDecodingService],
  exports: [EnergiaDecodingService],
})
export class EnergiaDecodingModule {}
