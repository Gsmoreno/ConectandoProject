using Conectando.Domains;
using Conectando.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Conectando.Repositories
{
    public class CursoRepository : RepositoryBase<Curso>, ICursoRepository
    {
        public void Atualizar(Curso cursoAtualizado, int id)
        {
            Curso cursoBuscado = GetById(id);

            if (cursoAtualizado.Nome != null && cursoAtualizado.Nome != cursoBuscado.Nome)
            {
                cursoBuscado.Nome = cursoAtualizado.Nome;
            }

            Update(cursoBuscado);
        }
    }
}
