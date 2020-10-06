using Conectando.Contexts;
using Conectando.Domains;
using Conectando.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Conectando.Repositories
{
    public class EnderecoRepository : RepositoryBase<Endereco>,IEnderecoRepository
    {
        ConectandoContext ctx = new ConectandoContext();
        public void Atualizar(Endereco endereco, int id)
        {
            Endereco enderecoBuscado = GetById(id);

            if (enderecoBuscado.Uf != endereco.Uf)
            {
                enderecoBuscado.Uf = endereco.Uf;
            }
            if (enderecoBuscado.Cidade != endereco.Cidade)
            {
                enderecoBuscado.Cidade = endereco.Cidade;
            }
            if (enderecoBuscado.Cep != endereco.Cep)
            {
                enderecoBuscado.Cep = endereco.Cep;
            }
            if (enderecoBuscado.Bairro != endereco.Bairro)
            {
                enderecoBuscado.Bairro = endereco.Bairro;
            }
            if (enderecoBuscado.Rua != endereco.Rua)
            {
                enderecoBuscado.Rua = endereco.Rua;
            }
            if (enderecoBuscado.Numero != endereco.Numero)
            {
                enderecoBuscado.Numero = endereco.Numero;
            }
            if (enderecoBuscado.Complemento != endereco.Complemento)
            {
                enderecoBuscado.Complemento = endereco.Complemento;
            }

            ctx.Endereco.Update(enderecoBuscado);
            ctx.SaveChanges();
        }

        public int Cadastrar(Endereco endereco)
        {

            ctx.Endereco.Add(endereco);
            ctx.SaveChanges();

            int id = endereco.IdEndereco;

            Console.WriteLine(id);

            return id;
        }
    }
}
