using System;
using System.Collections.Generic;

namespace Conectando.Domains
{
    public partial class Endereco
    {
        public Endereco()
        {
            Aluno = new HashSet<Aluno>();
            Empresa = new HashSet<Empresa>();
            Vaga = new HashSet<Vaga>();
        }

        public int IdEndereco { get; set; }
        public string Uf { get; set; }
        public string Cidade { get; set; }
        public string Cep { get; set; }
        public string Bairro { get; set; }
        public string Rua { get; set; }
        public string Numero { get; set; }
        public string Complemento { get; set; }

        public virtual ICollection<Aluno> Aluno { get; set; }
        public virtual ICollection<Empresa> Empresa { get; set; }
        public virtual ICollection<Vaga> Vaga { get; set; }
    }
}
