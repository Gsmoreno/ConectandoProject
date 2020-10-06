using Conectando.Contexts;
using Conectando.Domains;
using Conectando.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Conectando.Repositories;
using Microsoft.EntityFrameworkCore;


namespace Conectando.Repositories
{
    public class EmpresaRepository : RepositoryBase<Empresa>, IEmpresaRepository
    {
        ConectandoContext ctx = new ConectandoContext();


        public void Atualizar(Empresa empresaAtualizada, int id)
        {

            Empresa empresaBuscada = GetById(id);

            if (empresaAtualizada.RazaoSocial != null && empresaAtualizada.RazaoSocial != empresaBuscada.RazaoSocial)
            {
                empresaBuscada.RazaoSocial = empresaAtualizada.RazaoSocial;
            }

            if (empresaAtualizada.NomeFantasia != null && empresaAtualizada.NomeFantasia != empresaBuscada.NomeFantasia)
            {
                empresaBuscada.NomeFantasia = empresaAtualizada.NomeFantasia;
            }

            if (empresaAtualizada.Email != null && empresaAtualizada.Email != empresaBuscada.Email)
            {

                empresaBuscada.Email = empresaAtualizada.Email;
            }

            if (empresaAtualizada.Senha != null && empresaAtualizada.Senha != empresaBuscada.Senha)
            {
                empresaBuscada.Senha = empresaAtualizada.Senha;
            }

            if (empresaAtualizada.Cnpj != null && empresaAtualizada.Cnpj != empresaBuscada.Cnpj)
            {
                empresaBuscada.Cnpj = empresaAtualizada.Cnpj;
            }

            if (empresaAtualizada.Cnae != null && empresaAtualizada.Cnae != empresaBuscada.Cnpj)
            {
                empresaBuscada.Cnae = empresaAtualizada.Cnae;
            }

            if (empresaAtualizada.Whatsapp != null && empresaAtualizada.Whatsapp != empresaBuscada.Whatsapp)
            {
                empresaBuscada.Whatsapp = empresaAtualizada.Whatsapp;
            }

            if (empresaAtualizada.PorteEmpresa != null && empresaAtualizada.PorteEmpresa != empresaBuscada.PorteEmpresa)
            {
                empresaBuscada.PorteEmpresa = empresaAtualizada.PorteEmpresa;
            }

            if (empresaAtualizada.Foto != null && empresaAtualizada.Foto != empresaBuscada.Foto)
            {
                empresaBuscada.Foto = empresaAtualizada.Foto;
            }

            if (empresaAtualizada.Situacao != empresaBuscada.Situacao)
            {
                empresaBuscada.Situacao = empresaAtualizada.Situacao;
            }


            Update(empresaBuscada);
        }

        public Empresa Login(string entrada, string senha)
        {
            return ctx.Empresa.FirstOrDefault(u => (u.Email == entrada) || (u.Cnpj == entrada) && (u.Senha == senha));
        }
    }

}


