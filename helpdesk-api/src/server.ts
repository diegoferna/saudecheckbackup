import fastify from 'fastify'
import { env } from './env'
import cors from '@fastify/cors'
import { distritosRoutes } from './routes/distrito'
import { unidadesRoutes } from './routes/unidade'
import { checklistsRoutes } from './routes/checklist'
import { usuariosRoutes } from './routes/usuario'
import { motivoRoutes } from './routes/motivo'
import { ItemChecklist } from './routes/itemChecklist'
import { itemChecklistMotivo } from './routes/itemChecklistMotivo'
import { enderecoRoutes } from './routes/endereco'

const app = fastify()

app.register(cors, {
    origin: ["*"], //["https://dominio1.com", "https://dominio2.com"],
    methods: ["GET", "POST", "PUT", "DELETE"], // métodos HTTP permitidos
  });
app.register(distritosRoutes, {
    prefix: 'distrito'
})

app.register(unidadesRoutes, {
    prefix: 'unidade'
})

app.register(usuariosRoutes, {
    prefix: 'usuario'
})

app.register(checklistsRoutes, {
    prefix: 'checklists'
})

app.register(motivoRoutes, {
    prefix: 'motivo'
})

app.register(ItemChecklist, {
    prefix: 'ItemChecklist'
})


app.register(itemChecklistMotivo, {
    prefix: 'itemChecklistMotivo'
})


app.register(enderecoRoutes, {
    prefix: 'endereco'
})

app.listen({
    port: env.PORT,
    host: '0.0.0.0'
}).then(() => {
    console.log('Http server runing')
})
