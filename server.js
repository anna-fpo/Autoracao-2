// Importa os módulos necessários
const express = require("express"); // Framework para criação de aplicações web
const cors = require("cors"); // Middleware para permitir requisições entre domínios (Cross-Origin)
const path = require("path"); // Módulo para lidar com caminhos de arquivos de forma segura
const fs = require("fs"); // Módulo para manipulação de arquivos do sistema
const { v4: uuidv4 } = require("uuid");


const ARQUIVO = "usuarios.json";

// Inicializa o app Express
const app = express();

// Define o endereço e porta em que o servidor vai escutar
const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 3000;

app.use(express.json()); //ativa parser JSON para este projeto

// Configura o Express para servir arquivos estáticos da pasta "public"
// Isso permite acessar arquivos como index.html diretamente
app.use(express.static(path.join(__dirname, "public")));

// Ativa o CORS para permitir chamadas HTTP de outras origens (por exemplo, frontend em outro servidor)
app.use(cors());

/**
 * Função que lê o arquivo usuarios.json e retorna até 'qtd' usuários
 * Se houver erro na leitura, retorna um array vazio
 */
function lerUsuarios(max=0) {
  try {
    const dados = fs.readFileSync("usuarios.json", "utf-8"); // Lê o conteúdo do arquivo
    const usuarios = JSON.parse(dados); // Converte a string JSON em array de objetos
    let algunsUsuarios = [];

    if (max === 0) {
      max = usuarios.length;
    }

    for (let cont = 0; cont < max; cont++) {
      algunsUsuarios[cont] = usuarios[cont];
    }

    return algunsUsuarios;
  } catch (erro) {
    // Em caso de erro (arquivo ausente ou malformado), exibe no console e retorna array vazio
    console.error("Erro ao ler o arquivo usuarios.json:", erro);
    return [];
  }
}

let usuarios = lerUsuarios();
/**
 * Salva o Array de usuários passado como argumento, para um arquivo JSON.
 *
 * Args:
 *   usuarios (Array): Array de Objetos.
 */
function salvarUsuarios(usuarios) {
  fs.writeFileSync(ARQUIVO, JSON.stringify(usuarios, null, 2), "utf8");
}

// Rota principal ("/")
// Envia o arquivo index.html que está na pasta "public"
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public") + "index.html");
});

app.post("/cadastrar-usuario", (req, res) => {
  console.log(usuarios.length);

  const novoUsuario = {
    id: uuidv4(),
    nome: req.body.nome,
    idade: req.body.idade,
    endereco: req.body.endereco,
    email: req.body.email,
  };
  usuarios.push(novoUsuario);
  salvarUsuarios(usuarios);
  //res.status(200);
  res.status(201).json({
    ok: true,
    message: "Usuário cadastrado com sucesso!",
    usuario: novoUsuario,
  });
});

// Rota "/list-users/:count?"
// Retorna um JSON com até 'count' usuários do arquivo usuarios.json
app.get("/list-users/:count?", (req, res) => {
  let num = parseInt(req.params.count); // Lê o parâmetro :count e converte para número

  // Define valor padrão e limites de segurança
  // if (isNaN(num)) num=100;
  // if (num < 100) num = 100;
  // if (num > 100_000) num = 100_000;
  console.log(num);
  // Envia os usuários lidos como resposta JSON
  res.json(lerUsuarios(num));
});

// Inicia o servidor e exibe a URL no console
app.listen(PORT, HOST, () => {
  console.log(`🚀 Servidor rodando em http://${HOST}:${PORT}`);
});

app.put('/usuarios/:id', (req, res) => {
  let usuarios = lerUsuarios();
  const index = usuarios.findIndex(u => u.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ erro: 'Usuário não encontrado' });
  }

  usuarios[index] = { ...usuarios[index], ...req.body };
  salvarUsuarios(usuarios);
  res.json(usuarios[index]);
});

app.delete('/usuarios/:id', (req, res) => {
  let usuarios = lerUsuarios();
  const index = usuarios.findIndex(u => u.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ erro: 'Usuário não encontrado' });
  }

  const removido = usuarios.splice(index, 1)[0];
  salvarUsuarios(usuarios);
  res.json(removido);
});