using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Conectando.ViewModels
{
    public class InscricoesViewModel
    {
        public int IdAluno { get; set; }
        public string Nome { get; set; }
        public string Curso { get; set; }
        public int Semestre { get; set; }
        public int IdCurso { get; set; }
        public string FocoArea { get; set; }
        public string Remoto { get; set; }
        public string Foto { get; set; }
        public string exp { get; set; }
        public List<int> idVaga { get; set; }
        public string DataInscricao { get; set; }
        public string cidade { get; set; }
        public string uf { get; set; }
        public List<string> vagasCadastradas { get; set; }
    }
}
