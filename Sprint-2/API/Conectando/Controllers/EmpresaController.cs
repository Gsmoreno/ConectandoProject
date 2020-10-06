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
    public class EmpresaController : ControllerBase
    {
        private IEmpresaRepository _empresaRepository;

        public EmpresaController()
        {
            _empresaRepository = new EmpresaRepository();
        }

        /// <summary>
        /// Lista as empresas
        /// </summary>
        /// <returns>Uma lista de empresas</returns>
        /// <response code="200">Se a lista for acessada com sucesso</response>
        /// <response code="400">Erro em alguma parte da requisição</response>
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        // GET: api/<Empresa>
        [Authorize(Roles = "Empresa,Administrador")]
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_empresaRepository.GetAll());
        }

        /// <summary>
        /// Lista uma empresa pelo ID
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Lista das empresas pelo id</returns>
        /// <response code="200">Se a lista for acessada com sucesso</response>
        /// <response code="400">Erro em alguma parte da requisição</response>
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        // GET: api/<Empresa>/{id}
        [Authorize(Roles = "Empresa,Administrador")]
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            return Ok(_empresaRepository.GetById(id));
        }

        /// <summary>
        /// Cadastra uma nova empresa
        /// </summary>
        /// <param name="novaEmpresa">Objeto que será cadastrado</param>
        /// <returns>Uma nova empresa cadastrada</returns>
        /// <response code="200">Se a requisição ocorrer da forma esperada</response>
        /// <response code="400">Erro em alguma parte da requisição</response>
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        // POST: api/<Empresa>
        [Authorize(Roles = "Empresa,Administrador")]
        [HttpPost]
        public IActionResult Post(Empresa novaEmpresa)
        {
            try
            {
                _empresaRepository.Add(novaEmpresa);
                return Ok("Empresa cadastrada");
            }
            catch
            {
                return BadRequest("Erro ao cadastrar");
            }
        }

        /// <summary>
        /// Atualiza uma empresa pelo Id
        /// </summary>
        /// <param name="atualizarEmpresa"></param>
        /// <param name="id"></param>
        /// <returns>Atualização dos dados da empresa</returns>
        /// <response code="200">Se a requisição ocorrer da forma esperada</response>
        /// <response code="400">Erro em alguma parte da requisição</response>
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        // PUT: api/<Empresa>/{id}
        [Authorize(Roles = "Empresa,Administrador")]
        [HttpPut("{id}")]
        public IActionResult Put(Empresa atualizarEmpresa, int id)
        {
            try
            {
                _empresaRepository.Atualizar(atualizarEmpresa, id);

                return Ok("Empresa Atualizada");
            }
            catch
            {
                return BadRequest("Erro ao atualizar");
            }
        }

        /// <summary>
        /// Deleta uma empresa pelo Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        /// <response code="200">Se a requisição ocorrer da forma esperada</response>
        /// <response code="400">Erro em alguma parte da requisição</response>
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        // DELETE: api/<Empresa>/{id}
        [Authorize(Roles = "Empresa,Administrador")]
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                Empresa empresaBuscada = _empresaRepository.GetById(id);
                _empresaRepository.Delete(empresaBuscada);
                return Ok("Empresa deletada");
            }
            catch
            {
                return BadRequest("Erro ao deletar");
            }
        }


    }

}
