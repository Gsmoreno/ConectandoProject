using Conectando.Contexts;
using Conectando.Domains;
using Conectando.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Conectando.Repositories
{
    public class TagsAlunoRepository : RepositoryBase<TagsAluno>, ITagsAlunoRepository
    {
        ConectandoContext ctx = new ConectandoContext();

       

        public TagsAluno BuscarPorId(int id)
        {
            return ctx.TagsAluno.FirstOrDefault(u => u.IdTags == id);
        }

        public void Cadastrar(TagsAluno novaTag)
        {
            ctx.TagsAluno.Add(novaTag);

            ctx.SaveChanges();
        }

        public void Deletar(int id)
        {
            TagsAluno tagBuscada = ctx.TagsAluno.Find(id);

            ctx.TagsAluno.Remove(tagBuscada);

            ctx.SaveChanges();
        }

        public List<TagsAluno> Listar()
        {
            return ctx.TagsAluno.ToList();
        }
    }
}
