using Conectando.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Conectando.Interfaces
{
    public interface IAdministradorRepository : IRepositoryBase<Administrador>
    {
        void Atualizar(Administrador adm, int id);

        void TrocarSenha(int id, string senhaAtual, string senhaNova);

        Administrador BuscarPorEmail(string email, string senha);

        Administrador Login(string entrada, string senha);
    }
}
