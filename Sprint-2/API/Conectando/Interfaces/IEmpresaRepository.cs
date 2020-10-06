using Conectando.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Conectando.Interfaces
{
    public interface IEmpresaRepository : IRepositoryBase<Empresa>
    {
        void Atualizar(Empresa empresa, int id);
        Empresa Login(string entrada, string senha);
    }
}
