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
    public class VagaController : ControllerBase
    {
        private IVagaRepository _vagaRepository;

        public VagaController()
        {
            _vagaRepository = new VagaRepository();
        }

        /// <summary>
        /// Listar vagas
        /// </summary>
        /// <returns>Lista de vagas</returns>
        /// <response code="200">Se a requisição ocorrer da forma esperada</response>
        /// <response code="400">Erro em alguma parte da requisição</response>
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        // GET api/<Vaga>
        [Authorize]
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_vagaRepository.GetAll());

        }

        /// <summary>
        /// Buscar uma vaga pelo ID
        /// </summary>
        /// <param name="id"></param>
        /// <returns>A vaga selecionada</returns>
        /// <response code="200">Se a requisição ocorrer da forma esperada</response>
        /// <response code="400">Erro em alguma parte da requisição</response>
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        // GET api/<Vaga>/{id}
        [Authorize]
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            return Ok(_vagaRepository.GetById(id));
        }

        /// <summary>
        /// Cadastra uma nova vaga
        /// </summary>
        /// <param name="novaVaga"></param>
        /// <response code="200">Se a requisição ocorrer da forma esperada</response>
        /// <response code="400">Erro em alguma parte da requisição</response>
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        // POST api/<Vaga>
        [Authorize(Roles = "Empresa,Administrador")]
        [HttpPost]
        public IActionResult Post(Vaga novaVaga)
        {
            try
            {
                _vagaRepository.Add(novaVaga);
                return Ok("Vaga cadastrada");
            }
            catch
            {
                return BadRequest("Erro ao cadastrar");
            }
        }

        /// <summary>
        /// Atualiza uma vaga
        /// </summary>
        /// <param name="atualizarVaga"></param>
        /// <param name="id"></param>
        /// <returns></returns>
        /// <response code="200">Se a requisição ocorrer da forma esperada</response>
        /// <response code="400">Erro em alguma parte da requisição</response>
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        // PUT api/<Vaga>/{id}
        [Authorize(Roles = "Empresa,Administrador")]
        [HttpPut("{id}")]
        public IActionResult Put(Vaga atualizarVaga, int id)
        {
            try
            {
                _vagaRepository.Atualizar(atualizarVaga, id);
                return Ok("Vaga atualizada");
            }
            catch
            {
                return BadRequest("Erro ao atualizar");
            }
        }

        /// <summary>
        /// Deleta uma vaga
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        /// <response code="200">Se a requisição ocorrer da forma esperada</response>
        /// <response code="400">Erro em alguma parte da requisição</response>
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        // DELETE api/<Vaga>/{id}
        [Authorize(Roles = "Empresa,Administrador")]
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                Vaga vagaBuscada = _vagaRepository.GetById(id);
                _vagaRepository.Delete(vagaBuscada);
                return Ok("Vaga deleta");
            }
            catch
            {
                return BadRequest("Erro ao deletar a vaga");
            }
        }

        /// <summary>
        /// Lista as vagas com as inscrições
        /// </summary>
        /// <returns></returns>
        [HttpGet("Inscricao")]
        public IActionResult GetInscricoes()
        {
            try
            {
                return Ok(_vagaRepository.ListarAlunosInscritos());
            }
            catch
            {
                return BadRequest("Vagas não listadas");
            }
        }
    }
}
