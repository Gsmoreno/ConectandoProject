using System;
using System.Collections.Generic;

namespace Conectando.Domains
{
    public partial class Administrador
    {
        public int IdAdministrador { get; set; }
        public string Nome { get; set; }
        public string Email { get; set; }
        public string Senha { get; set; }
        public string Rg { get; set; }
        public string Cpf { get; set; }
        public string Foto { get; set; }
    }
}
