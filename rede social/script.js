document.addEventListener("DOMContentLoaded", () => {
  renderizarPostagens();

  // Alternar modo noturno
  const darkModeToggle = document.getElementById("darkModeToggle");
  darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    document.getElementById("socialContainer").classList.toggle("dark-mode");
    document.getElementById("postForm").classList.toggle("dark-mode");
    const posts = document.querySelectorAll(".post");
    posts.forEach((post) => post.classList.toggle("dark-mode"));
    const comments = document.querySelectorAll(".comment");
    comments.forEach((comment) => comment.classList.toggle("dark-mode"));
  });

  // Formulário para nova postagem
  const postForm = document.getElementById("postForm");
  postForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const titulo = document.getElementById("newTitle").value;
    const conteudo = document.getElementById("newContent").value;

    if (titulo && conteudo) {
      const novaPostagem = {
        titulo,
        conteudo,
        data: new Date().toISOString().slice(0, 10),
        comentarios: [],
        autor: {
          nome: "Você",
          avatar: "https://randomuser.me/api/portraits/lego/1.jpg",
          cargo: "Membro",
        },
      };
      adicionarPostagem(novaPostagem);
      postForm.reset();
    } else {
      alert("Por favor, preencha todos os campos.");
    }
  });
});

// Função para carregar e renderizar as postagens
async function renderizarPostagens() {
  try {
    const resposta = await fetch("data.json");
    const dados = await resposta.json();

    dados.postagens.forEach(adicionarPostagem);
  } catch (error) {
    console.error("Erro ao carregar postagens:", error);
  }
}

// Função para adicionar uma postagem ao DOM
function adicionarPostagem(postagem) {
  const container = document.querySelector("#postsContainer");
  const postagemHTML = `
      <div class="post bg-white rounded-lg shadow-lg p-6 mb-6 text-gray-800">
        <div class="flex items-center mb-4">
          <img src="${
            postagem.autor.avatar
          }" alt="Avatar do autor" class="w-12 h-12 rounded-full mr-4 border-2 border-yellow-400 shadow-lg">
          <div>
            <h2 class="text-xl font-semibold">${postagem.autor.nome}</h2>
            <p class="text-sm text-gray-500">${postagem.autor.cargo}</p>
          </div>
        </div>
        <h3 class="text-lg font-semibold mb-2 text-yellow-600">${
          postagem.titulo
        }</h3>
        <p class="text-gray-700 mb-4">${postagem.conteudo}</p>
        <p class="text-sm text-gray-400">${postagem.data}</p>
        
        <div class="mt-6 border-t border-gray-200 pt-4">
          <h4 class="text-lg font-semibold mb-4 text-pink-600">Comentários</h4>
          ${postagem.comentarios
            .map(
              (comentario) => `
            <div class="comment bg-gray-100 p-3 rounded-lg mb-4 shadow-inner border-l-4 border-pink-400">
              <h5 class="text-lg font-semibold">${comentario.titulo} - <span class="text-gray-500">${comentario.autor}</span></h5>
              <p class="text-gray-600 mb-2">${comentario.conteudo}</p>
              <p class="text-sm text-gray-400">${comentario.data}</p>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
    `;
  container.insertAdjacentHTML("beforeend", postagemHTML);
}
