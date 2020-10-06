using Conectando.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Conectando.Interfaces
{
    public interface ITagsAlunoRepository : IRepositoryBase<TagsAluno>
    {
        List<TagsAluno> Listar();

        TagsAluno BuscarPorId(int id);

        void Cadastrar(TagsAluno novaTag);


       

        void Deletar(int id);
    }
}
