import {
  IsString,
  IsEmail,
  IsArray,
  IsOptional,
  IsEnum,
  IsNumber,
  IsDate,
  ValidateNested,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';

export class ConsumoInput {
  @IsNumber(
    {},
    { message: 'O campo "consumoForaPontaEmKWH" deve ser um número.' },
  )
  consumoForaPontaEmKWH: number;

  @IsDate({ message: 'O campo "mesDoConsumo" deve ser uma data válida.' })
  mesDoConsumo: Date;
}

export class FaturaInput {
  @IsString({
    message: 'O campo "codigoDaUnidadeConsumidora" deve ser uma string.',
  })
  codigoDaUnidadeConsumidora: string;

  @IsEnum(['monofasico', 'bifasico', 'trifasico'], {
    message:
      'O campo "modeloFasico" deve ser um dos seguintes valores: monofasico, bifasico ou trifasico.',
  })
  modeloFasico: 'monofasico' | 'bifasico' | 'trifasico';

  @IsEnum(['AX', 'B1', 'B2', 'B3'], {
    message:
      'O campo "enquadramento" deve ser um dos seguintes valores: AX, B1, B2 ou B3.',
  })
  enquadramento: 'AX' | 'B1' | 'B2' | 'B3';

  @IsArray({ message: 'O campo "historicoDeConsumoEmKWH" deve ser um array.' })
  @IsOptional()
  @ValidateNested({
    each: true,
    message:
      'Cada item de "historicoDeConsumoEmKWH" deve ser um objeto válido.',
  })
  @Type(() => ConsumoInput)
  historicoDeConsumoEmKWH: ConsumoInput[];

  @IsString({ message: 'O campo "pathDoArquivo" deve ser uma string.' })
  @IsOptional()
  pathDoArquivo?: string;
}

export class SolicitarSimulacaoDeCompensacaoEnergeticaInput {
  @IsNotEmpty({ message: 'O campo "nomeCompleto" deve ser uma string.' })
  @IsString({ message: 'O campo "nomeCompleto" deve ser uma string.' })
  nomeCompleto: string;

  @IsEmail({}, { message: 'O campo "email" deve ser um email válido.' })
  email: string;

  @IsNotEmpty({ message: 'O campo "telefone" deve ser uma string.' })
  @IsString({ message: 'O campo "telefone" deve ser uma string.' })
  telefone: string;

  @IsArray({ message: 'O campo "informacoesDaFatura" deve ser um array.' })
  informacoesDaFatura: FaturaInput[];
}
