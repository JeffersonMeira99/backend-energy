import { Injectable, BadRequestException } from '@nestjs/common';
import axios from 'axios';
import FormData from 'form-data';
import * as fs from 'fs';

@Injectable()
export class EnergiaDecodingService {
  async enviarContaDeEnergia(filePath: string) {
    try {
      const form = new FormData();
      form.append('file', fs.createReadStream(filePath)); // Enviando o arquivo para o servidor

      const response = await axios.post(
        'https://magic-pdf.solarium.newsun.energy/v1/magic-pdf',
        form,
        {
          headers: form.getHeaders(),
        },
      );
      return response.data; // Retornando o resultado da decodificação
    } catch (error) {
      throw new BadRequestException(
        'Erro ao enviar a conta para decodificação',
      );
    }
  }
}
