using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Conectando.Domains;
using Conectando.Interfaces;
using Conectando.Repositories;
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
        [Authorize]
        [HttpGet]
        public IEnumerable<Inscricao> Get()
        {
            return _inscricaoRepository.GetAll();
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
        [Authorize]
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return Ok(_inscricaoRepository.GetById(id));
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
        [Authorize]
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
        [Authorize]
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
        [Authorize]
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