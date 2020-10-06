using Conectando.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Conectando.Interfaces
{
    public interface IVagaRepository : IRepositoryBase<Vaga>
    {
        void Atualizar(Vaga vaga, int id);

        List<Vaga> ListarAlunosInscritos();
    }
}
