using Conectando.Contexts;
using Conectando.Domains;
using Conectando.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Conectando.Repositories
{
    public class TagsVagaRepository : RepositoryBase<TagsVaga>, ITagsVagaRepository
    {
        ConectandoContext ctx = new ConectandoContext();

        

        public TagsVaga BuscarPorId(int id)
        {
            return ctx.TagsVaga.FirstOrDefault(u => u.IdTags == id);
        }

        public void Cadastrar(TagsVaga novaTag)
        {
            ctx.TagsVaga.Add(novaTag);

            ctx.SaveChanges();
        }

        public void Deletar(int id)
        {
            TagsVaga tagBuscada = ctx.TagsVaga.Find(id);

            ctx.TagsVaga.Remove(tagBuscada);

            ctx.SaveChanges();
        }

        public List<TagsVaga> Listar()
        {
            return ctx.TagsVaga.ToList();
        }
    }
}
