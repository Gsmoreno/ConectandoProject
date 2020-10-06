using Conectando.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Conectando.Interfaces
{
    public interface ICursoRepository : IRepositoryBase<Curso>
    {
        void Atualizar(Curso cursoAtualizado, int id);
    }
}
