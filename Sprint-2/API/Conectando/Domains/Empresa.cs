using System;
using System.Collections.Generic;

namespace Conectando.Domains
{
    public partial class Empresa
    {
        public Empresa()
        {
            Vaga = new HashSet<Vaga>();
        }

        public int IdEmpresa { get; set; }
        public string RazaoSocial { get; set; }
        public string NomeFantasia { get; set; }
        public string Email { get; set; }
        public string Senha { get; set; }
        public string Cnpj { get; set; }
        public string Cnae { get; set; }
        public string Whatsapp { get; set; }
        public string PorteEmpresa { get; set; }
        public string Foto { get; set; }
        public int Situacao { get; set; }
        public int? IdEndereco { get; set; }

        public virtual Endereco IdEnderecoNavigation { get; set; }
        public virtual ICollection<Vaga> Vaga { get; set; }
    }
}
