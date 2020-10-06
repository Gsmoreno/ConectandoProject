using Conectando.Contexts;
using Conectando.Domains;
using Conectando.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Conectando.Repositories
{
    public class VagaRepository : RepositoryBase<Vaga>, IVagaRepository
    {
        ConectandoContext ctx = new ConectandoContext();
        public void Atualizar(Vaga vagaAtualizada, int id)
        {

            Vaga vagaBuscada = GetById(id);

            if (vagaAtualizada.Nome != null && vagaAtualizada.Nome != vagaBuscada.Nome)
            {
                vagaBuscada.Nome = vagaAtualizada.Nome;
            }

            if (vagaAtualizada.Area != null && vagaAtualizada.Area != vagaBuscada.Area)
            {
                vagaBuscada.Area = vagaAtualizada.Area;
            }

            if (vagaAtualizada.NivelExp != null && vagaAtualizada.NivelExp != vagaBuscada.NivelExp)
            {

                vagaBuscada.NivelExp = vagaAtualizada.NivelExp;
            }

            if (vagaAtualizada.TipoContrato != null && vagaAtualizada.TipoContrato != vagaBuscada.TipoContrato)
            {
                vagaBuscada.TipoContrato = vagaAtualizada.TipoContrato;
            }

            if (vagaAtualizada.Remoto != null && vagaAtualizada.Remoto != vagaBuscada.Remoto)
            {
                vagaBuscada.Remoto = vagaAtualizada.Remoto;
            }

            if (vagaAtualizada.Detalhes != null && vagaAtualizada.Detalhes != vagaBuscada.Detalhes)
            {
                vagaBuscada.Detalhes = vagaAtualizada.Detalhes;
            }

            if (vagaAtualizada.Requisitos != null && vagaAtualizada.Requisitos != vagaBuscada.Requisitos)
            {
                vagaBuscada.Requisitos = vagaAtualizada.Requisitos;
            }

            if (vagaAtualizada.Horario != null && vagaAtualizada.Horario != vagaBuscada.Horario)
            {
                vagaBuscada.Horario = vagaAtualizada.Horario;
            }

            if (vagaAtualizada.Salario != null && vagaAtualizada.Salario != vagaBuscada.Salario)
            {
                vagaBuscada.Salario = vagaAtualizada.Salario;
            }

            if (vagaAtualizada.Beneficios != null && vagaAtualizada.Beneficios != vagaBuscada.Beneficios)
            {
                vagaBuscada.Beneficios = vagaAtualizada.Beneficios;
            }

            if (vagaAtualizada.Prazo != null && vagaAtualizada.Prazo != vagaBuscada.Prazo)
            {
                vagaBuscada.Prazo = vagaAtualizada.Prazo;
            }

            if (vagaAtualizada.LimiteAlunos != null && vagaAtualizada.LimiteAlunos != vagaBuscada.LimiteAlunos)
            {
                vagaBuscada.LimiteAlunos = vagaAtualizada.LimiteAlunos;
            }

            if (vagaAtualizada.Situacao != null && vagaAtualizada.Situacao != vagaBuscada.Situacao)
            {
                vagaBuscada.Situacao = vagaAtualizada.Situacao;
            }
            if (vagaAtualizada.IdEndereco != null && vagaAtualizada.IdEndereco != vagaBuscada.IdEndereco)
            {
                vagaBuscada.IdEndereco = vagaAtualizada.IdEndereco;
            }

            if (vagaAtualizada.IdEmpresa != null && vagaAtualizada.IdEmpresa != vagaBuscada.IdEmpresa)
            {

                vagaBuscada.IdEmpresa = vagaAtualizada.IdEmpresa;
            }

            ctx.Update(vagaBuscada);

            ctx.SaveChanges();
        }
        public List<Vaga> ListarAlunosInscritos()
        {
            return ctx.Vaga.Include(x => x.Inscricao).ToList();
        }
    }
}
