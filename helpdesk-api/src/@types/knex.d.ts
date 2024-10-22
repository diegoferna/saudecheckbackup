import {Knex} from 'knex'

declare module 'knex/types/tables'{
    export interface Tables {
         distrito:{
          id: string;
          nome: string;
          local: string;
          coordenador: string
         }
         unidade:{
          id: string;
          nome: string;
          local: string;
          gerenteId: string;
          distritoId: string;
         }
         usuario:{
          id: string;
          nome: string;
          email: string;
          senha: string;
          tipo: string;
         }
         checklist:{
          id: string;
          data: string;

          farmacia_disponivel?: boolean;
          motivo_farmacia?: string | null;
        
          vacina_disponivel?: boolean;
          motivo_vacina?: string | null;
        
          curativo_simples_disponivel?: boolean;
          motivo_curativo_simples?: string | null;
        
          curativo_especial_disponivel?: boolean;
          motivo_curativo_especial?: string | null;
        
          procedimento_disponivel?: boolean;
          motivo_procedimento?: string | null;
        
          marcacao_interna_disponivel?: boolean;
          motivo_marcacao_interna?: string | null;
        
          marcacao_externa_disponivel?: boolean;
          motivo_marcacao_externa?: string | null;
        
          atendimento_medico_disponivel?: boolean;
          motivo_atendimento_medico?: string | null;
        
          atendimento_odontologico_disponivel?: boolean;
          motivo_atendimento_odontologico?: string | null;
        
          acolhimento_disponivel?: boolean;
          motivo_acolhimiento?: string | null;
        
          coleta_laboratorio_disponivel?: boolean;
          motivo_coleta_laboratorio?: string | null;
        
          visita_domiciliar_disponivel?: boolean;
          motivo_visita_domiciliar?: string | null;
        
          sala_Laboratorio_disponivel?: boolean;
          motivo_sala_laboratorio?: string | null;
        
          sala_esterilizacao_disponivel?: boolean;
          motivo_sala_esterilizacao?: string | null;
        
          carro_visita_disponivel?: boolean;
          motivo_carro_visita?: string | null;
        
          instabilidade_informacao_disponivel?: boolean;
          motivo_instabilidade_informacao?: string | null;
          
          
          //Checklist Ocasional
          alvara_sanitario?: boolean;
          data_alvara_sanitario?: string | null;
        
        
          relotacao_profissional_disponivel?: boolean;
          nome_profissional_relotacao?: string | null;
          data_relotacao?: string | null;
        
          afastamento_profissional_disponivel?: boolean;
          nome_profissional_afastamento?: string | null;
          data_afastamento_profissional?: string | null;
        
        
          apresentacao_profissional_disponivel?: boolean;
          nome_profissional_apresentacao?: string | null;
          data_apresentacao_profissional?: string | null;
        
          desligamento_profissional_disponivel?: boolean;
          nome_profissional_desligamento?: string | null;
          data_desligamento_profissional?: string | null;
        
          acionamento_samu_disponivel?: boolean;
          motivo_acionamento_samu?: string | null;
          data_acionamento_samu?: string | null;
        
          ausencia_insumo_disponivel?: boolean;
          motivo_ausencia_insumo?: string | null;
          data_ausencia_insumo?: string | null;
        
          incidentes_criticos_disponivel?: boolean;
          motivo_incidentes_criticos?: string | null;
          data_incidentes_criticos?: string | null;
        
        
          intercorrencia_estrutural_disponivel?: boolean;
          motivo_intercorrencia_estrutural?: string | null;
          data_intercorrencia_estrutural?: string | null;
         }
          
   }
}
