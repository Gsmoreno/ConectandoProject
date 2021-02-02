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
    public class InscricaoRepository : RepositoryBase<Inscricao>, IInscricaoRepository
    {
        ConectandoContext ctx = new ConectandoContext();

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

        public List<Inscricao> BuscarInscricoes(int id)
        {
            return ctx.Inscricao.Include(x => x.IdAlunoNavigation).ThenInclude(x => x.IdCursoNavigation).Where(x => x.IdVaga == id).ToList();
        }

        public IEnumerable<Inscricao> GetTudo()
        {
            return ctx.Inscricao.Include(x => x.IdAlunoNavigation).Include(y => y.IdVagaNavigation).ThenInclude(z => z.IdEmpresaNavigation);
        }

        public List<Inscricao> ListarVagaIdAluno(int id)
        {
            return ctx.Inscricao.Include(x => x.IdVagaNavigation).ThenInclude(x => x.IdEmpresaNavigation).Include(x => x.IdVagaNavigation).ThenInclude(x => x.IdEnderecoNavigation).Where(x => x.IdAluno == id).ToList();
        }
    }
}
