using Conectando.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Conectando.Interfaces
{
    public interface IInscricaoRepository : IRepositoryBase<Inscricao>
    {
        void Atualizar(Inscricao inscricaoAtualizado, int id);
    }
}
