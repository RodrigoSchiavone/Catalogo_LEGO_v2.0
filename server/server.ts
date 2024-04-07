import fastify from "fastify";
import {z} from 'zod';
import path from 'path';
import fastifyStatic from '@fastify/static';

const app = fastify()

const excelDataSchema = z.object({
    name: z.string(),
    data: z.record(z.unknown())

})

app.register(fastifyStatic, {
    root: path.join(__dirname, '..', 'public'), 
    prefix: '/' 
})


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