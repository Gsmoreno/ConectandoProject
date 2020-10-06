using System;
using System.Collections.Generic;

namespace Conectando.Domains
{
    public partial class Aluno
    {
        public Aluno()
        {
            Inscricao = new HashSet<Inscricao>();
            TagsAluno = new HashSet<TagsAluno>();
        }

        public int IdAluno { get; set; }
        public string Nome { get; set; }
        public string Email { get; set; }
        public string Senha { get; set; }
        public string Rg { get; set; }
        public string Cpf { get; set; }
        public string Foto { get; set; }
        public string Whatsapp { get; set; }
        public int Semestre { get; set; }
        public string FocoCarreira { get; set; }
        public string LinkPortifolio { get; set; }
        public string NivelExp { get; set; }
        public string Deficiencia { get; set; }
        public string DescricaoDeficiencia { get; set; }
        public string PrefPorte { get; set; }
        public string PrefRemoto { get; set; }
        public string PrefContrato { get; set; }
        public int? IdEndereco { get; set; }
        public int? IdCurso { get; set; }

        public virtual Curso IdCursoNavigation { get; set; }
        public virtual Endereco IdEnderecoNavigation { get; set; }
        public virtual ICollection<Inscricao> Inscricao { get; set; }
        public virtual ICollection<TagsAluno> TagsAluno { get; set; }
    }
}
