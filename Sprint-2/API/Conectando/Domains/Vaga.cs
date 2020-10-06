using System;
using System.Collections.Generic;

namespace Conectando.Domains
{
    public partial class Vaga
    {
        public Vaga()
        {
            Inscricao = new HashSet<Inscricao>();
            TagsVaga = new HashSet<TagsVaga>();
        }

        public int IdVaga { get; set; }
        public string Nome { get; set; }
        public string Area { get; set; }
        public string NivelExp { get; set; }
        public string TipoContrato { get; set; }
        public string Remoto { get; set; }
        public string Detalhes { get; set; }
        public string Requisitos { get; set; }
        public string Horario { get; set; }
        public decimal Salario { get; set; }
        public string Beneficios { get; set; }
        public DateTime Prazo { get; set; }
        public int? LimiteAlunos { get; set; }
        public int Situacao { get; set; }
        public int? IdEndereco { get; set; }
        public int? IdEmpresa { get; set; }

        public virtual Empresa IdEmpresaNavigation { get; set; }
        public virtual Endereco IdEnderecoNavigation { get; set; }
        public virtual ICollection<Inscricao> Inscricao { get; set; }
        public virtual ICollection<TagsVaga> TagsVaga { get; set; }
    }
}
