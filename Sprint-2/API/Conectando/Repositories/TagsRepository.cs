using Conectando.Contexts;
using Conectando.Domains;
using Conectando.Interfaces;
using Microsoft.AspNetCore.Diagnostics;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Conectando.Repositories
{
    public class TagsRepository : RepositoryBase<Tags>, ITagsRepository
    {
        ConectandoContext ctx = new ConectandoContext();

        public void Atualizar(int id, Tags tagAtualizada)
        {
            Tags tagBuscada = ctx.Tags.Find(id);

            if (tagAtualizada != null && tagAtualizada != tagBuscada ){
                
                tagBuscada.Nome = tagAtualizada.Nome;

                ctx.Tags.Update(tagBuscada);

                ctx.SaveChanges();

            }
            
        }

        public Tags BuscarPorId(int id)
        {
          return ctx.Tags.FirstOrDefault(u => u.IdTags == id);
        }

        public void Cadastrar(Tags novaTag)
        {
            if (novaTag != null)
            {

                ctx.Tags.Add(novaTag);

                ctx.SaveChanges();
            }
        }

        public void Deletar(int id)
        {
            Tags tagBuscada = ctx.Tags.Find(id);

            ctx.Tags.Remove(tagBuscada);

            ctx.SaveChanges();
        }

        public List<Tags> Listar()
        {
            return ctx.Tags.ToList();
        }
    }
}
