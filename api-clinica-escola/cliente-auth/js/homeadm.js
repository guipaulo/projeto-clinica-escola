const API = "http://localhost:3000";


const resultado = document.getElementById("resultado");
const corpoTabela = document.getElementById("corpoTabela");

const cardEditar = document.getElementById("cardEditar");

const formEditar = document.getElementById("formEditar");


let usuariosCache = [];


// ======================================================
// Usuário logado
// ======================================================

document.getElementById("usuario-logado").textContent =
    `Administrador: ${usuario.nome}`;



// ======================================================
// Headers
// ======================================================

function getHeaders(json = false) {

    const headers = {

        Authorization: `Bearer ${token}`

    };


    if (json) {

        headers["Content-Type"] =
            "application/json";

    }


    return headers;

}



// ======================================================
// Logout
// ======================================================

document
    .getElementById("logout")
    .addEventListener(
        "click",
        logout
    );


function logout() {


    localStorage.removeItem("token");

    localStorage.removeItem("usuario");


    window.location.href =
        "index.html";

}



// ======================================================
// Mensagens
// ======================================================


function mostrarMensagem(
    texto,
    tipo = "info"
) {


    resultado.className =
        "mensagem";


    if (tipo === "sucesso") {

        resultado.classList.add(
            "sucesso"
        );

    }


    if (tipo === "erro") {

        resultado.classList.add(
            "erro"
        );

    }



    resultado.textContent =
        texto;


}




// ======================================================
// Eventos
// ======================================================


document
    .getElementById("listarUsuarios")
    .addEventListener(
        "click",
        listarUsuarios
    );



document
    .getElementById("formCadastro")
    .addEventListener(
        "submit",
        cadastrarUsuario
    );



document
    .getElementById("pesquisa")
    .addEventListener(
        "input",
        filtrarUsuarios
    );



formEditar.addEventListener(
    "submit",
    salvarEdicao
);



document
    .getElementById("cancelarEdicao")
    .addEventListener(
        "click",
        cancelarEdicao
    );




// ======================================================
// Listar usuários
// ======================================================


async function listarUsuarios() {


    try {


        const response =
            await fetch(
                `${API}/usuarios`,
                {
                    headers:
                        getHeaders()
                }
            );



        const dados =
            await response.json();



        if (!response.ok) {


            mostrarMensagem(
                obterErro(dados),
                "erro"
            );


            return;

        }



        usuariosCache =
            dados;



        renderizarTabela(
            usuariosCache
        );



        mostrarMensagem(
            "Usuários carregados com sucesso.",
            "sucesso"
        );



    } catch (erro) {


        mostrarMensagem(
            "Erro ao carregar usuários.",
            "erro"
        );


    }


}



// ======================================================
// Renderizar tabela
// ======================================================


function renderizarTabela(lista) {


    corpoTabela.innerHTML =
        "";



    if (!lista.length) {


        corpoTabela.innerHTML = `

        <tr>

            <td colspan="7">

                Nenhum usuário encontrado.

            </td>

        </tr>

        `;


        return;

    }



    lista.forEach(usuario => {



        const tr =
            document.createElement(
                "tr"
            );



        const criadoEm =
            usuario.criadoEm

            ?

            new Date(
                usuario.criadoEm
            )
            .toLocaleString(
                "pt-BR"
            )

            :

            "-";



        tr.innerHTML = `


            <td>
                ${usuario.id}
            </td>


            <td>
                ${usuario.nome}
            </td>


            <td>
                ${usuario.email}
            </td>


            <td>
                ${usuario.perfil}
            </td>


            <td>


                <span class="
                    status
                    ${usuario.ativo
                        ? "status-ativo"
                        : "status-inativo"}
                ">


                    ${
                        usuario.ativo
                        ? "Ativo"
                        : "Inativo"
                    }


                </span>


            </td>


            <td>
                ${criadoEm}
            </td>



            <td>


                <button
                    class="btn-editar"
                    data-id="${usuario.id}">

                    Editar

                </button>



                ${
                    usuario.ativo

                    ?

                    `

                    <button
                        class="btn-inativar"
                        data-id="${usuario.id}">

                        Inativar

                    </button>

                    `

                    :

                    `

                    <button
                        class="btn-reativar"
                        data-id="${usuario.id}">

                        Reativar

                    </button>

                    `

                }


            </td>


        `;



        corpoTabela.appendChild(tr);


    });



    adicionarEventosTabela();


}




// ======================================================
// Eventos da tabela
// ======================================================


function adicionarEventosTabela() {



    document
        .querySelectorAll(".btn-editar")
        .forEach(botao => {


            botao.onclick =
                () =>
                    carregarEdicao(
                        botao.dataset.id
                    );


        });



    document
        .querySelectorAll(".btn-inativar")
        .forEach(botao => {


            botao.onclick =
                () =>
                    inativarUsuario(
                        botao.dataset.id
                    );


        });



    document
        .querySelectorAll(".btn-reativar")
        .forEach(botao => {


            botao.onclick =
                () =>
                    reativarUsuario(
                        botao.dataset.id
                    );


        });


}



// ======================================================
// Pesquisa
// ======================================================


function filtrarUsuarios() {


    const termo =
        document
        .getElementById("pesquisa")
        .value
        .toLowerCase();



    const filtrados =
        usuariosCache.filter(usuario => {


            return (

                usuario.id
                .toString()
                .includes(termo)


                ||
                
                usuario.nome
                .toLowerCase()
                .includes(termo)


                ||

                usuario.email
                .toLowerCase()
                .includes(termo)


                ||

                usuario.perfil
                .toLowerCase()
                .includes(termo)


                ||

                (
                    usuario.ativo
                    ? "ativo"
                    : "inativo"
                )
                .includes(termo)

            );


        });



    renderizarTabela(
        filtrados
    );


}



// ======================================================
// Tratamento de erro
// ======================================================


function obterErro(resposta) {


    if (
        resposta.message
    ) {


        if (
            Array.isArray(
                resposta.message
            )
        ) {

            return resposta.message.join(
                ", "
            );

        }


        return resposta.message;


    }



    return "Ocorreu um erro.";

}

// ======================================================
// Cadastrar usuário
// ======================================================


async function cadastrarUsuario(event) {


    event.preventDefault();



    const form =
        event.target;



    const dados = {


        nome:
            form.nome.value.trim(),


        email:
            form.email.value.trim(),


        senha:
            form.senha.value,


        perfil:
            form.perfil.value


    };



    try {


        const response =
            await fetch(
                `${API}/usuarios`,
                {

                    method:
                        "POST",


                    headers:
                        getHeaders(true),


                    body:
                        JSON.stringify(dados)

                }
            );



        const resposta =
            await response.json();



        if (!response.ok) {


            mostrarMensagem(
                obterErro(resposta),
                "erro"
            );


            return;

        }



        mostrarMensagem(
            "Usuário cadastrado com sucesso.",
            "sucesso"
        );



        form.reset();



        listarUsuarios();



    } catch (erro) {


        mostrarMensagem(
            "Erro ao cadastrar usuário.",
            "erro"
        );


    }


}




// ======================================================
// Carregar usuário para edição
// ======================================================


async function carregarEdicao(id) {



    try {


        const response =
            await fetch(
                `${API}/usuarios/${id}`,
                {

                    headers:
                        getHeaders()

                }
            );



        const usuario =
            await response.json();



        if (!response.ok) {


            mostrarMensagem(
                obterErro(usuario),
                "erro"
            );


            return;

        }



        preencherFormularioEdicao(
            usuario
        );



        cardEditar.style.display =
            "block";



        cardEditar.scrollIntoView(
            {
                behavior:
                    "smooth"
            }
        );



    } catch (erro) {


        mostrarMensagem(
            "Erro ao buscar usuário.",
            "erro"
        );


    }



}




// ======================================================
// Preencher formulário edição
// ======================================================


function preencherFormularioEdicao(usuario) {


    formEditar.id.value =
        usuario.id;



    formEditar.nome.value =
        usuario.nome;



    formEditar.email.value =
        usuario.email;



    formEditar.senha.value =
        "";



    formEditar.perfil.value =
        usuario.perfil;



    formEditar.ativo.value =
        usuario.ativo
            ? "true"
            : "false";


}




// ======================================================
// Salvar edição
// PATCH /usuarios/:id
// ======================================================


async function salvarEdicao(event) {


    event.preventDefault();



    const id =
        formEditar.id.value;



    const dados = {


        nome:
            formEditar.nome.value.trim(),


        email:
            formEditar.email.value.trim(),


        perfil:
            formEditar.perfil.value,


        ativo:
            formEditar.ativo.value === "true"


    };



    /*
       Só envia senha se foi preenchida.
       Assim não altera a senha sem necessidade.
    */

    if (
        formEditar.senha.value.trim()
    ) {


        dados.senha =
            formEditar.senha.value;


    }



    try {


        const response =
            await fetch(
                `${API}/usuarios/${id}`,
                {

                    method:
                        "PATCH",


                    headers:
                        getHeaders(true),


                    body:
                        JSON.stringify(dados)

                }
            );



        const resposta =
            await response.json();



        if (!response.ok) {


            mostrarMensagem(
                obterErro(resposta),
                "erro"
            );


            return;

        }



        mostrarMensagem(
            "Usuário atualizado com sucesso.",
            "sucesso"
        );



        cancelarEdicao();



        listarUsuarios();



    } catch (erro) {


        mostrarMensagem(
            "Erro ao atualizar usuário.",
            "erro"
        );


    }



}





// ======================================================
// Cancelar edição
// ======================================================


function cancelarEdicao() {


    formEditar.reset();



    cardEditar.style.display =
        "none";


}



// ======================================================
// Inativar usuário
// ======================================================


async function inativarUsuario(id) {



    const confirmar =
        confirm(
            "Deseja realmente inativar este usuário?"
        );



    if (!confirmar) {

        return;

    }



    try {


        const response =
            await fetch(
                `${API}/usuarios/${id}/inativar`,
                {

                    method:
                        "PATCH",


                    headers:
                        getHeaders()

                }
            );



        const resposta =
            await response.json();



        if (!response.ok) {


            mostrarMensagem(
                obterErro(resposta),
                "erro"
            );


            return;

        }



        mostrarMensagem(
            "Usuário inativado com sucesso.",
            "sucesso"
        );



        listarUsuarios();



    } catch (erro) {


        mostrarMensagem(
            "Erro ao inativar usuário.",
            "erro"
        );


    }


}




// ======================================================
// Reativar usuário
// ======================================================


async function reativarUsuario(id) {



    const confirmar =
        confirm(
            "Deseja reativar este usuário?"
        );



    if (!confirmar) {

        return;

    }



    try {


        const response =
            await fetch(
                `${API}/usuarios/${id}/reativar`,
                {

                    method:
                        "PATCH",


                    headers:
                        getHeaders()

                }
            );



        const resposta =
            await response.json();



        if (!response.ok) {


            mostrarMensagem(
                obterErro(resposta),
                "erro"
            );


            return;

        }



        mostrarMensagem(
            "Usuário reativado com sucesso.",
            "sucesso"
        );



        listarUsuarios();



    } catch (erro) {


        mostrarMensagem(
            "Erro ao reativar usuário.",
            "erro"
        );


    }


}





// ======================================================
// Inicialização
// ======================================================


window.addEventListener(
    "load",
    () => {

        listarUsuarios();

    }
);