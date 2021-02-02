using Conectando.Contexts;
using Conectando.Domains;
using Conectando.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Conectando.Repositories
{
    public class AdministradorRepository : RepositoryBase<Administrador>,IAdministradorRepository
    {
        ConectandoContext ctx = new ConectandoContext();
        public void Atualizar(Administrador adm, int id)
        {
            Administrador admBuscado = GetById(id);

            if (admBuscado.Nome != adm.Nome)
            {
                admBuscado.Nome = adm.Nome;
            }
            if (admBuscado.Email != adm.Email)
            {
                admBuscado.Email = adm.Email;
            }
            if (admBuscado.Rg != adm.Rg && adm.Rg.Replace(" ", "").Length == 9)
            {
                admBuscado.Rg = adm.Rg;
            }
            if (admBuscado.Cpf != adm.Cpf && adm.Cpf.Replace(" ", "").Length == 11)
            {
                admBuscado.Cpf = adm.Cpf;
            }
            ctx.Administrador.Update(admBuscado);
            ctx.SaveChanges();
        }

        public Administrador BuscarPorEmail(string email, string senha)
        {
            return ctx.Administrador.FirstOrDefault(a => a.Email == email && a.Senha == senha);
        }

        public void TrocarSenha(int id, string senhaAtual, string senhaNova)
        {
            Administrador admBuscado = GetById(id);

            if (admBuscado.Senha == senhaAtual)
            {
                admBuscado.Senha = senhaNova;
            }

            ctx.Administrador.Update(admBuscado);
            ctx.SaveChanges();
        }

        public Administrador Login(string entrada, string senha)
        {
            return ctx.Administrador.FirstOrDefault(u => (u.Email == entrada) &&(u.Senha == senha) || (u.Cpf == entrada) && (u.Senha == senha));
        }
    }
}
