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
    public class CursoController : ControllerBase
    {
        private ICursoRepository _cursoRepository;

        public CursoController()
        {
            _cursoRepository = new CursoRepository();
        }

        /// <summary>
        /// Busca cursos
        /// </summary>
        /// <returns>Retorna uma lista de cursos ou NotFound caso tenha algum erro</returns>
        /// <response code="200">Se a lista for acessada com sucesso</response>
        /// <response code="400">Erro em alguma parte da requisição</response>
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        // GET: api/<Curso>
        [HttpGet]
        public IEnumerable<Curso> Get()
        {
            return _cursoRepository.GetAll();
        }

        /// <summary>
        /// Busca um curso através do seu ID
        /// </summary>
        /// <param name="id">ID do curso que será buscado</param>
        /// <returns>Retorna um curso buscada ou NotFound caso nenhuma seja encontrado</returns>
        /// <response code="200">Se a lista for acessada com sucesso</response>
        /// <response code="400">Erro em alguma parte da requisição</response>
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        // GET: api/<Curso>/{id}
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return Ok(_cursoRepository.GetById(id));
        }

        /// <summary>
        /// Cadastra um novo curso
        /// </summary>
        /// <param name="curso">Objeto que será cadastrado</param>
        /// <response code="201">Se o curso for cadastrado com sucesso</response>
        /// <response code="400">Erro em alguma parte da requisição</response>
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        // POST api/<Curso>
        [Authorize(Roles = "Aluno,Empresa,Administrador")]
        [HttpPost]
        public IActionResult Post(Curso curso)
        {
            try
            {
                _cursoRepository.Add(curso);
                return Created("Cadastrado com sucesso!", curso);
            }
            catch
            {

                return BadRequest("Erro ao cadastrar!");
            }
        }

        /// <summary>
        /// Atualiza um curso pelo ID.
        /// </summary>
        /// <param name="id">ID do curso que será atualizado</param>
        /// <param name="curso">Objeto a ser atualizado</param>
        /// <response code="200">Se a requisição ocorrer da forma esperada</response>
        /// <response code="400">Erro em alguma parte da requisição</response>
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        // PUT api/<Curso>/{id}
        [Authorize(Roles = "Aluno,Empresa,Administrador")]
        [HttpPut("{id}")]
        public IActionResult Put(Curso curso, int id)
        {
            try
            {
                _cursoRepository.Atualizar(curso, id);
                return Ok("Atualizado com sucesso!");
            }
            catch
            {
                return BadRequest("Erro ao atualizar!");
            }
        }

        /// <summary>
        /// Deleta um curso pelo ID.
        /// </summary>
        /// <param name="id">ID do curso que será deletado</param>
        /// <response code="200">Se a requisição ocorrer da forma esperada</response>
        /// <response code="400">Erro em alguma parte da requisição</response>
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        // DELETE api/<Curso>/{id}
        [Authorize(Roles = "Aluno,Empresa,Administrador")]
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                Curso curso = _cursoRepository.GetById(id);
                _cursoRepository.Delete(curso);
                return Ok("Deletado com sucesso!");
            }
            catch
            {
                return BadRequest("Erro ao deletar!");
            }
        }
    }
}