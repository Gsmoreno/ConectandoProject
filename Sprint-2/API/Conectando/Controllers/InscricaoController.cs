using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
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
    public class InscricaoController : ControllerBase
    {
        private IInscricaoRepository _inscricaoRepository;

        public InscricaoController()
        {
            _inscricaoRepository = new InscricaoRepository();
        }

        /// <summary>
        /// Busca inscrições
        /// </summary>
        /// <returns>Retorna uma lista de inscrições ou NotFound caso tenha algum erro</returns>
        /// <response code="200">Se a lista for acessada com sucesso</response>
        /// <response code="400">Erro em alguma parte da requisição</response>
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        // GET: api/<Inscricao>
        [Authorize(Roles = "Aluno,Administrador,Empresa")]
        [HttpGet]
        public IEnumerable<Inscricao> Get()
        {
            return _inscricaoRepository.GetTudo();
        }

        /// <summary>
        /// Busca uma inscrição através do seu ID
        /// </summary>
        /// <param name="id">ID da inscrição que será buscado</param>
        /// <returns>Retorna uma inscrição buscada ou NotFound caso nenhuma seja encontrado</returns>
        /// <response code="200">Se a lista for acessada com sucesso</response>
        /// <response code="400">Erro em alguma parte da requisição</response>
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        // GET: api/<Inscricao>/{id}
        [Authorize(Roles = "Aluno,Administrador,Empresa")]
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return Ok(_inscricaoRepository.GetById(id));
        }


        /// <summary>
        /// Busca uma inscrição através do ID de um aluno
        /// </summary>
        /// <param name="id">ID do aluno que será buscado</param>
        /// <returns>Retorna uma lista de inscrições buscada ou NotFound caso nenhuma seja encontrado</returns>
        /// <response code="200">Se a lista for acessada com sucesso</response>
        /// <response code="400">Erro em alguma parte da requisição</response>
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        // GET: api/<Inscricao>/VagasAluno/{id}
        [Authorize(Roles = "Aluno,Administrador,Empresa")]
        [HttpGet("VagasAluno/{id}")]
        public IActionResult Get2(int id)
        {
            return Ok(_inscricaoRepository.ListarVagaIdAluno(id));
        }

        /// <summary>
        /// Busca inscrições através do ID de uma vaga
        /// </summary>
        /// <param name="id">ID da vaga</param>
        /// <returns>Retorna uma lista de alunos buscada ou NotFound caso nenhuma seja encontrado</returns>
        /// <response code="200">Se a lista for acessada com sucesso</response>
        /// <response code="400">Erro em alguma parte da requisição</response>
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        // GET: api/<Inscricao>/{id}
        [Authorize(Roles = "Aluno,Administrador,Empresa")]
        [HttpGet("Alunos/{id}")]
        public IActionResult Buscar(int id)
        {
            List<Inscricao> inscricoesBuscadas = _inscricaoRepository.BuscarInscricoes(id);
            List<InscricoesViewModel> inscricoesPersonalizadas = new List<InscricoesViewModel> { };
            foreach (var item in inscricoesBuscadas)
            {
                InscricoesViewModel nova = new InscricoesViewModel
                {
                    IdAluno = Convert.ToInt32(item.IdAluno),
                    Nome = item.IdAlunoNavigation.Nome,
                    Curso = item.IdAlunoNavigation.IdCursoNavigation.Nome,
                    FocoArea = item.IdAlunoNavigation.FocoCarreira,
                    Remoto = item.IdAlunoNavigation.PrefRemoto,
                    Semestre = item.IdAlunoNavigation.Semestre,
                    IdCurso = Convert.ToInt32(item.IdAlunoNavigation.IdCurso),
                    Foto = item.IdAlunoNavigation.Foto,
                    DataInscricao = $"{item.DataInscricao.Value.Day}/{item.DataInscricao.Value.Month}/{item.DataInscricao.Value.Year}"
                };

                inscricoesPersonalizadas.Add(nova);
            }
            return Ok(inscricoesPersonalizadas);
        }

        /// <summary>
        /// Cadastra uma nova inscrição
        /// </summary>
        /// <param name="inscricao">Objeto que será cadastrado</param>
        /// <response code="201">Se a inscrição for cadastrada com sucesso</response>
        /// <response code="400">Erro em alguma parte da requisição</response>
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        // POST api/<Inscricao>
 
        [HttpPost]
        public IActionResult Post(Inscricao inscricao)
        {
            try
            {
                _inscricaoRepository.Add(inscricao);
                return Created("Cadastrado com sucesso!", inscricao);
            }
            catch
            {

                return BadRequest("Erro ao cadastrar!");
            }
        }

        /// <summary>
        /// Atualiza uma inscrição pelo ID.
        /// </summary>
        /// <param name="id">ID da inscrição que será atualizada</param>
        /// <param name="inscricao">Objeto a ser atualizado</param>
        /// <response code="200">Se a requisição ocorrer da forma esperada</response>
        /// <response code="400">Erro em alguma parte da requisição</response>
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        // PUT api/<Inscricao>/{id}
        [Authorize(Roles = "Aluno,Administrador,Empresa")]
        [HttpPut("{id}")]
        public IActionResult Put(Inscricao inscricao, int id)
        {
            try
            {
                _inscricaoRepository.Atualizar(inscricao, id);
                return Ok("Atualizado com sucesso!");
            }
            catch
            {
                return BadRequest("Erro ao atualizar!");
            }
        }

        /// <summary>
        /// Deleta uma inscrição pelo ID.
        /// </summary>
        /// <param name="id">ID da inscrição que será deletada</param>
        /// <response code="200">Se a requisição ocorrer da forma esperada</response>
        /// <response code="400">Erro em alguma parte da requisição</response>
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        // DELETE api/<Inscricao>/{id}
        [Authorize(Roles = "Aluno,Administrador,Empresa")]
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                Inscricao inscricao = _inscricaoRepository.GetById(id);
                _inscricaoRepository.Delete(inscricao);
                return Ok("Deletado com sucesso!");
            }
            catch
            {
                return BadRequest("Erro ao deletar!");
            }
        }
    }
}