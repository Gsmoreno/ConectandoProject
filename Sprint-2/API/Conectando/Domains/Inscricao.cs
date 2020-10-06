using System;
using System.Collections.Generic;

namespace Conectando.Domains
{
    public partial class Inscricao
    {
        public int IdInscricao { get; set; }
        public DateTime? DataInscricao { get; set; }
        public int? IdAluno { get; set; }
        public int? IdVaga { get; set; }

        public virtual Aluno IdAlunoNavigation { get; set; }
        public virtual Vaga IdVagaNavigation { get; set; }
    }
}
