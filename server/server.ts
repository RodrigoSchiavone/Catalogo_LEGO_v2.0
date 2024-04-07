import fastify from "fastify";
import {z} from 'zod';
import path from 'path';

const app = fastify()

const excelDataSchema = z.object({
    name: z.string(),
    data: z.record(z.unknown())

})


app.get('/', async (request, reply) => {
    try {
      // Caminho para o arquivo index.html
      const indexPath = path.join(__dirname, '..','public', 'index.html');
  
      // Envia o arquivo index.html como resposta
      reply.sendFile('index.html', indexPath);
    } catch (error) {
      reply.code(500).send('Erro ao processar a solicitação');
    }
  });


app.post('/xlInfo', async (request, reply) => {
    try {
    
      const { name, data } = excelDataSchema.parse(request.body);
  
      
      console.log('Nome do arquivo:', name);
      console.log('Dados do Excel:', data);
  
      
      reply.send({ success: true, message: 'Dados recebidos com sucesso' });
    } catch (error) {

      reply.code(400).send({ success: false, message: 'Erro de validação', errors: error.errors });
    }
  });

app.listen({

    host: '0.0.0.0',
    port: process.env.PORT ? Number(process.env.PORT) : 3333,
}).then(()=>{
    console.log('http server running')
})