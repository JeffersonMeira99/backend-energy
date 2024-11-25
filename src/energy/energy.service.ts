import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lead } from './entities/lead.entity';
import { Unidade } from './entities/unidade.entity';
import { Consumo } from './entities/consumo.entity';
import { SolicitarSimulacaoDeCompensacaoEnergeticaInput } from './dto/SolicitarSimulacaoDeCompensacaoEnergeticaInput.dto';

@Injectable()
export class EnergyService {
  constructor(
    @InjectRepository(Lead)
    private leadRepository: Repository<Lead>,

    @InjectRepository(Unidade)
    private unidadeRepository: Repository<Unidade>,

    @InjectRepository(Consumo)
    private consumoRepository: Repository<Consumo>,
  ) {}

  async registrarSimulacao(
    input: SolicitarSimulacaoDeCompensacaoEnergeticaInput,
  ) {
    const existingLead = await this.leadRepository.findOne({
      where: { email: input.email },
    });
    if (existingLead) {
      throw new BadRequestException('Email já cadastrado');
    }

    const lead = this.leadRepository.create({
      nomeCompleto: input.nomeCompleto,
      email: input.email,
      telefone: input.telefone,
      unidades: [],
    });

    await this.leadRepository.save(lead);

    for (const fatura of input.informacoesDaFatura) {
      const unidade = this.unidadeRepository.create({
        codigoDaUnidadeConsumidora: fatura.codigoDaUnidadeConsumidora,
        modeloFasico: fatura.modeloFasico as
          | 'monofasico'
          | 'bifasico'
          | 'trifasico',
        enquadramento: fatura.enquadramento as 'AX' | 'B1' | 'B2' | 'B3',
        lead: lead,
      });

      lead.unidades.push(unidade);
      await this.unidadeRepository.save(unidade);

      const consumos = fatura.historicoDeConsumoEmKWH.map((consumo) =>
        this.consumoRepository.create({
          consumoForaPontaEmKWH: consumo.consumoForaPontaEmKWH,
          mesDoConsumo: consumo.mesDoConsumo,
          unidade: unidade,
        }),
      );

      await this.consumoRepository.save(consumos);
    }

    return lead;
  }

  async listarSimulacoes(filters: any) {
    const queryBuilder = this.leadRepository
      .createQueryBuilder('lead')
      .leftJoinAndSelect('lead.unidades', 'unidade')
      .leftJoinAndSelect('unidade.historicoDeConsumoEmKWH', 'consumo');

    const conditions = [
      { field: 'nomeCompleto', query: 'lead.nomeCompleto', operator: 'LIKE' },
      { field: 'email', query: 'lead.email', operator: 'LIKE' },
      {
        field: 'codigoDaUnidadeConsumidora',
        query: 'unidade.codigoDaUnidadeConsumidora',
        operator: 'LIKE',
      },
      { field: 'enquadramento', query: 'unidade.enquadramento', operator: '=' },
      { field: 'mesDoConsumo', query: 'consumo.mesDoConsumo', operator: '=' },
    ];

    conditions.reduce((qb, condition) => {
      if (filters[condition.field]) {
        qb.andWhere(
          `${condition.query} ${condition.operator} :${condition.field}`,
          {
            [condition.field]:
              condition.operator === 'LIKE'
                ? `%${filters[condition.field]}%`
                : filters[condition.field],
          },
        );
      }
      return qb;
    }, queryBuilder);

    return queryBuilder.getMany();
  }

  async obterSimulacaoPorId(id: string) {
    const lead = await this.leadRepository.findOne({
      where: { id },
      relations: ['unidades', 'unidades.historicoDeConsumoEmKWH'],
    });
    if (!lead) {
      throw new NotFoundException('Lead não encontrado');
    }
    return lead;
  }
}
