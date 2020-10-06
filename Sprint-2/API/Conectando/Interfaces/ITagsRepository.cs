using Conectando.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Conectando.Interfaces
{
    public interface ITagsRepository : IRepositoryBase<Tags>
    {
        List<Tags> Listar();

        Tags BuscarPorId(int id);

        void Cadastrar(Tags novaTag);

        
        void Atualizar(int id, Tags tagAtualizada);

     
        void Deletar(int id);

    }
}
