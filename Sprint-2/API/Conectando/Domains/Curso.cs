using System;
using System.Collections.Generic;

namespace Conectando.Domains
{
    public partial class Curso
    {
        public Curso()
        {
            Aluno = new HashSet<Aluno>();
        }

        public int IdCurso { get; set; }
        public string Nome { get; set; }

        public virtual ICollection<Aluno> Aluno { get; set; }
    }
}
