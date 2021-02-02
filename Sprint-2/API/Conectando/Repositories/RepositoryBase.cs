using Conectando.Contexts;
using Conectando.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Conectando.Repositories
{
    public class RepositoryBase<TEntity> : IRepositoryBase<TEntity> where TEntity : class
    {
        ConectandoContext ctx = new ConectandoContext();

        public void Add(TEntity obj)
        {
            try
            {
                ctx.Set<TEntity>().Add(obj);
                ctx.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void Delete(TEntity obj)
        {
            try
            {
                ctx.Set<TEntity>().Remove(obj);
                ctx.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<TEntity> GetAll()
        {
            return ctx.Set<TEntity>().ToList();
        }

        public IEnumerable<TEntity> GetAllInclude(Expression<Func<TEntity, object>> include1, Expression<Func<TEntity, object>> include2)
        {
            return ctx.Set<TEntity>().Include(include1).Include(include2).ToList();
        }


        public TEntity GetById(int id)
        {
            return ctx.Set<TEntity>().Find(id);
        }

        public void Update(TEntity obj)
        {
            try
            {
                ctx.Entry(obj).State = EntityState.Modified;
                ctx.SaveChanges();
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
    }
}
