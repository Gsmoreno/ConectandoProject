using Conectando.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Conectando.Interfaces
{
    public interface IAlunoRepository : IRepositoryBase<Aluno>
    {
        void Atualizar(Aluno alunoAtualizado, int id);
        Aluno Login(string entrada, string senha);

        List<Aluno> BuscarAlunosVagas(int id);

        IEnumerable<Aluno> GetIncludes();
        Aluno GetIncludeId(int id);
    }
}
