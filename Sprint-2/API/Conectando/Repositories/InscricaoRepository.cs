using Conectando.Domains;
using Conectando.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Conectando.Repositories
{
    public class InscricaoRepository : RepositoryBase<Inscricao>, IInscricaoRepository
    {
        public void Atualizar(Inscricao inscricaoAtualizado, int id)
        {
            Inscricao inscricaoBuscado = GetById(id);

            if (inscricaoAtualizado.DataInscricao != null && inscricaoAtualizado.DataInscricao != inscricaoBuscado.DataInscricao)
            {
                inscricaoBuscado.DataInscricao = inscricaoAtualizado.DataInscricao;
            }
            if (inscricaoAtualizado.IdAluno != null && inscricaoAtualizado.IdAluno != inscricaoBuscado.IdAluno)
            {
                inscricaoBuscado.IdAluno = inscricaoAtualizado.IdAluno;
            }
            if (inscricaoAtualizado.IdVaga != null && inscricaoAtualizado.IdVaga != inscricaoBuscado.IdVaga)
            {
                inscricaoBuscado.IdVaga = inscricaoAtualizado.IdVaga;
            }

            Update(inscricaoBuscado);
        }
    }
}
