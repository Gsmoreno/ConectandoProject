using Conectando.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Conectando.Interfaces
{
    public interface ITagsVagaRepository : IRepositoryBase<TagsVaga>
    {
        List<TagsVaga> Listar();

        TagsVaga BuscarPorId(int id);

        void Cadastrar(TagsVaga novaTag);

        void Deletar(int id);
    }
}
