using Conectando.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Conectando.Interfaces
{
    public interface IEnderecoRepository : IRepositoryBase<Endereco>
    {
        int Cadastrar(Endereco endereco);
        void Atualizar(Endereco endereco, int id);
    }
}
