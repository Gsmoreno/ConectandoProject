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
    public class AlunoRepository : RepositoryBase<Aluno>,IAlunoRepository
    {
        ConectandoContext ctx = new ConectandoContext();

        public void Atualizar (Aluno alunoAtualizado, int id)
        {
            Aluno alunoBuscado = GetById(id);

            if (alunoAtualizado.Nome != null && alunoAtualizado.Nome != alunoBuscado.Nome)
            {
                alunoBuscado.Nome = alunoAtualizado.Nome;
            }
            if (alunoAtualizado.Email != null && alunoAtualizado.Email != alunoBuscado.Email)
            {
                alunoBuscado.Email = alunoAtualizado.Email;
            }
            if (alunoAtualizado.Senha != null && alunoAtualizado.Senha != alunoBuscado.Senha)
            {
                alunoBuscado.Senha = alunoAtualizado.Senha;
            }
            if (alunoAtualizado.Rg != null && alunoAtualizado.Rg != alunoBuscado.Rg)
            {
                alunoBuscado.Rg = alunoAtualizado.Rg;
            }
            if (alunoAtualizado.Cpf != null && alunoAtualizado.Cpf != alunoBuscado.Cpf)
            {
                alunoBuscado.Cpf = alunoAtualizado.Cpf;
            }
            if (alunoAtualizado.Foto != null && alunoAtualizado.Foto != alunoBuscado.Foto)
            {
                alunoBuscado.Foto = alunoAtualizado.Foto;
            }
            if (alunoAtualizado.Whatsapp != null && alunoAtualizado.Whatsapp != alunoBuscado.Whatsapp)
            {
                alunoBuscado.Whatsapp = alunoAtualizado.Whatsapp;
            }
            if (alunoAtualizado.Semestre != alunoBuscado.Semestre)
            {
                alunoBuscado.Semestre = alunoAtualizado.Semestre;
            }
            if (alunoAtualizado.FocoCarreira != null && alunoAtualizado.FocoCarreira != alunoBuscado.FocoCarreira)
            {
                alunoBuscado.FocoCarreira = alunoAtualizado.FocoCarreira;
            }
            if (alunoAtualizado.LinkPortifolio != null && alunoAtualizado.LinkPortifolio != alunoBuscado.LinkPortifolio)
            {
                alunoBuscado.LinkPortifolio = alunoAtualizado.LinkPortifolio;
            }
            if (alunoAtualizado.NivelExp != null && alunoAtualizado.NivelExp != alunoBuscado.NivelExp)
            {
                alunoBuscado.NivelExp = alunoAtualizado.NivelExp;
            }
            if (alunoAtualizado.Deficiencia != null && alunoAtualizado.Deficiencia != alunoBuscado.Deficiencia)
            {
                alunoBuscado.Deficiencia = alunoAtualizado.Deficiencia;
            }
            if (alunoAtualizado.DescricaoDeficiencia != null && alunoAtualizado.DescricaoDeficiencia != alunoBuscado.DescricaoDeficiencia)
            {
                alunoBuscado.DescricaoDeficiencia = alunoAtualizado.DescricaoDeficiencia;
            }
            if (alunoAtualizado.PrefPorte != null && alunoAtualizado.PrefPorte != alunoBuscado.PrefPorte)
            {
                alunoBuscado.PrefPorte = alunoAtualizado.PrefPorte;
            }
            if (alunoAtualizado.PrefRemoto != null && alunoAtualizado.PrefRemoto != alunoBuscado.PrefRemoto)
            {
                alunoBuscado.PrefRemoto = alunoAtualizado.PrefRemoto;
            }
            if (alunoAtualizado.PrefContrato != null && alunoAtualizado.PrefContrato != alunoBuscado.PrefContrato)
            {
                alunoBuscado.PrefContrato = alunoAtualizado.PrefContrato;
            }
            if (alunoAtualizado.IdCurso != null && alunoAtualizado.IdCurso != alunoBuscado.IdCurso)
            {
                alunoBuscado.IdCurso = alunoAtualizado.IdCurso;
            }
            //Atualização do endereço

            Update(alunoBuscado);
        }

        public Aluno Login(string entrada, string senha)
        {
            return ctx.Aluno.FirstOrDefault(u => (u.Email == entrada) && (u.Senha == senha) || (u.Cpf == entrada) && (u.Senha == senha));
        }

        public Aluno GetIncludeId(int id)
        {
            return ctx.Aluno.Include(x => x.IdCursoNavigation).Include(x => x.IdEnderecoNavigation).Include(x => x.TagsAluno).FirstOrDefault(x => x.IdAluno == id);
        }

        public IEnumerable<Aluno> GetIncludes()
        {
            return ctx.Aluno.Include(x => x.IdCursoNavigation).Include(x => x.IdEnderecoNavigation).Include(x => x.TagsAluno).ToList();
        }

        public List<Aluno> BuscarAlunosVagas(int id)
        {
            return ctx.Aluno.Include(x => x.IdCursoNavigation).Include(x => x.IdEnderecoNavigation).Include(x => x.Inscricao).ThenInclude(x => x.IdVagaNavigation).ToList();
        }
    }
}
