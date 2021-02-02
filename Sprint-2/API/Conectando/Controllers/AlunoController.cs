using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Conectando.Domains;
using Conectando.Interfaces;
using Conectando.Repositories;
using Conectando.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Conectando.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class AlunoController : ControllerBase
    {
        private IAlunoRepository _alunoRepository;

        public AlunoController()
        {
            _alunoRepository = new AlunoRepository();
        }

        /// <summary>
        /// Busca alunos
        /// </summary>
        /// <returns>Retorna uma lista de alunos ou NotFound caso tenha algum erro</returns>
        /// <response code="200">Se a lista for acessada com sucesso</response>
        /// <response code="400">Erro em alguma parte da requisição</response>
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        // GET: api/<Aluno>
        [Authorize(Roles = "Aluno,Empresa,Administrador")]
        [HttpGet]
        public IEnumerable<Aluno> Get()
        {
            return _alunoRepository.GetIncludes();
        }

        /// <summary>
        /// Busca um Aluno por id
        /// </summary>
        /// <returns>Retorna um aluno ou NotFound caso tenha algum erro</returns>
        /// <response code="200">Se a lista for acessada com sucesso</response>
        /// <response code="400">Erro em alguma parte da requisição</response>
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        // GET: api/<Aluno>
        [Authorize(Roles = "Aluno,Empresa,Administrador")]
        [HttpGet("Al/{id}")]
        public IActionResult GetId(int id)
        {
            Aluno alunoBuscado = _alunoRepository.GetIncludeId(id);
            Aluno alunoFiltrado = new Aluno
            {
                Nome = alunoBuscado.Nome,
                Foto = alunoBuscado.Foto,
                PrefRemoto = alunoBuscado.PrefRemoto,
                FocoCarreira = alunoBuscado.FocoCarreira,
                Email = alunoBuscado.Email,
                Cpf = alunoBuscado.Cpf,
                Whatsapp = alunoBuscado.Whatsapp,
                NivelExp = alunoBuscado.NivelExp,
                Semestre = alunoBuscado.Semestre,
                Deficiencia = alunoBuscado.Deficiencia,
                IdCursoNavigation = new Curso
                {
                    Nome = alunoBuscado.IdCursoNavigation.Nome
                },
                IdEnderecoNavigation = new Endereco
                {
                    Cidade = alunoBuscado.IdEnderecoNavigation.Cidade,
                    Uf = alunoBuscado.IdEnderecoNavigation.Uf
                },
                TagsAluno = alunoBuscado.TagsAluno
            };
            return Ok(alunoFiltrado);
        }

        /// <summary>
        /// Busca alunos
        /// </summary>
        /// <returns>Retorna uma lista de alunos ou NotFound caso tenha algum erro</returns>
        /// <response code="200">Se a lista for acessada com sucesso</response>
        /// <response code="400">Erro em alguma parte da requisição</response>
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        // GET: api/<Aluno>
        [Authorize(Roles = "Aluno,Empresa,Administrador")]
        [HttpGet("Alunos/{id}")]
        public IActionResult GetAlunosEmpresa(int id)
        {
            List<Aluno> alunosBuscados = _alunoRepository.BuscarAlunosVagas(id);
            List<InscricoesViewModel> alunosfiltro = new List<InscricoesViewModel>();
            
            foreach (var item in alunosBuscados)
            {
                List<string> v = new List<string>();
                List<int> i = new List<int>();
                foreach (var e in item.Inscricao)
                {
                    if(e.IdVagaNavigation.IdEmpresa == id)
                    {
                        v.Add(e.IdVagaNavigation.Nome);
                        i.Add(Convert.ToInt32(e.IdVaga));
                    }
                }
                InscricoesViewModel aluno = new InscricoesViewModel
                {
                    IdAluno = Convert.ToInt32(item.IdAluno),
                    Nome = item.Nome,
                    Curso = item.IdCursoNavigation.Nome,
                    FocoArea = item.FocoCarreira,
                    Remoto = item.PrefRemoto,
                    Semestre = item.Semestre,
                    exp = item.NivelExp,
                    IdCurso = Convert.ToInt32(item.IdCurso),
                    Foto = item.Foto,
                    cidade = item.IdEnderecoNavigation.Cidade,
                    uf = item.IdEnderecoNavigation.Uf,
                    vagasCadastradas = v

            };
                
                
                alunosfiltro.Add(aluno);
            }
            return Ok(alunosfiltro);
        }

        /// <summary>
        /// Busca um aluno através do seu ID
        /// </summary>
        /// <param name="id">ID do aluno que será buscado</param>
        /// <returns>Retorna um aluno buscada ou NotFound caso nenhuma seja encontrado</returns>
        /// <response code="200">Se a lista for acessada com sucesso</response>
        /// <response code="400">Erro em alguma parte da requisição</response>
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        // GET: api/<Aluno>/{id}

        [Authorize(Roles = "Aluno,Administrador")]
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return Ok(_alunoRepository.GetIncludeId(id));
        }

        /// <summary>
        /// Cadastra um novo aluno
        /// </summary>
        /// <param name="aluno">Objeto que será cadastrado</param>
        /// <response code="201">Se o aluno for cadastrado com sucesso</response>
        /// <response code="400">Erro em alguma parte da requisição</response>
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        // POST api/<Aluno>
        [HttpPost]
        public IActionResult Post(Aluno aluno)
        {
            try
            {
                _alunoRepository.Add(aluno);
                return Created("Cadastrado com sucesso!", aluno);
            }
            catch
            {

                return BadRequest("Erro ao cadastrar!");
            }
        }

        /// <summary>
        /// Atualiza um aluno pelo ID.
        /// </summary>
        /// <param name="id">ID do aluno que será atualizado</param>
        /// <param name="aluno">Objeto a ser atualizado</param>
        /// <response code="200">Se a requisição ocorrer da forma esperada</response>
        /// <response code="400">Erro em alguma parte da requisição</response>
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        // PUT api/<Aluno>/{id}
        [Authorize(Roles = "Aluno,Administrador")]
        [HttpPut("{id}")]
        public IActionResult Put (Aluno aluno, int id)
        {
            try
            {
                _alunoRepository.Atualizar(aluno, id);
                return Ok("Atualizado com sucesso!");
            }
            catch
            {

                return BadRequest("Erro ao atualizar!");
            }
        }

        /// <summary>
        /// Deleta um aluno pelo ID.
        /// </summary>
        /// <param name="id">ID do aluno que será deletado</param>
        /// <response code="200">Se a requisição ocorrer da forma esperada</response>
        /// <response code="400">Erro em alguma parte da requisição</response>
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        // DELETE api/<Aluno>/{id}
        [Authorize(Roles = "Aluno,Administrador")]
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                Aluno aluno = _alunoRepository.GetById(id);
                _alunoRepository.Delete(aluno);
                return Ok("Deletado com sucesso!");
            }
            catch
            {
                return BadRequest("Erro ao deletar!");
            }
        }
    }
}