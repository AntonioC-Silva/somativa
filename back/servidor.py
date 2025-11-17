import http.server
import socketserver
import json
import os
import re
from urllib.parse import urlparse, parse_qs
from decimal import Decimal
import autenticacao
import filmes
import banco

PORTA = 8000
DIRETORIO_FRONT = os.path.join(os.path.dirname(__file__), '../dist')

class ConversorJsonCustomizado(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Decimal):
            return float(obj)
        return super(ConversorJsonCustomizado, self).default(obj)

class ManipuladorDeRequisicoes(http.server.SimpleHTTPRequestHandler):
    
    def enviar_json(self, dados, status=200):
        self.send_response(status)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(json.dumps(dados, cls=ConversorJsonCustomizado).encode('utf-8'))

    def ler_corpo_json(self):
        tamanho_conteudo = int(self.headers.get('Content-Length', 0))
        if tamanho_conteudo == 0:
            return {}
        corpo = self.rfile.read(tamanho_conteudo)
        return json.loads(corpo.decode('utf-8'))

    def servir_arquivo_estatico(self, caminho):
        if caminho == '/' or caminho == '':
            caminho = '/index.html'
        
        caminho = caminho.split('?')[0]
        
        caminho_completo = os.path.join(DIRETORIO_FRONT, caminho.lstrip('/'))
        
        if not os.path.exists(caminho_completo):
             caminho_completo = os.path.join(DIRETORIO_FRONT, 'index.html')

        ext = os.path.splitext(caminho_completo)[1]
        mime_type = 'text/html'
        if ext == '.css': mime_type = 'text/css'
        elif ext == '.js': mime_type = 'application/javascript'
        elif ext == '.png': mime_type = 'image/png'
        elif ext == '.svg': mime_type = 'image/svg+xml'
        elif ext == '.jpg' or ext == '.jpeg': mime_type = 'image/jpeg'

        try:
            with open(caminho_completo, 'rb') as f:
                self.send_response(200)
                self.send_header('Content-type', mime_type)
                self.end_headers()
                self.wfile.write(f.read())
        except Exception as e:
            self.send_error(404, "Arquivo nao encontrado")

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_POST(self):
        rota = urlparse(self.path).path
        
        try:
            if rota == '/api/login':
                dados = self.ler_corpo_json()
                resp, status = autenticacao.logar_usuario(dados.get('usuario'), dados.get('senha'))
                self.enviar_json(resp, status)
                return

            if rota == '/api/registro':
                dados = self.ler_corpo_json()
                resp, status = autenticacao.registrar_usuario(dados.get('usuario'), dados.get('senha'))
                self.enviar_json(resp, status)
                return

            if rota == '/api/filmes':
                dados = self.ler_corpo_json()
                resp, status = filmes.adicionar_filme_pendente(dados)
                self.enviar_json(resp, status)
                return
            
            if rota == '/api/filme/admin-add':
                dados = self.ler_corpo_json()
                resp, status = filmes.adicionar_filme_direto(dados)
                self.enviar_json(resp, status)
                return

            match_aprovar = re.match(r'^/api/filme/aprovar/(\d+)$', rota)
            if match_aprovar:
                id_pendente = int(match_aprovar.group(1))
                resp, status = filmes.aprovar_filme_pendente(id_pendente)
                self.enviar_json(resp, status)
                return

            match_sugerir = re.match(r'^/api/filme/sugerir-edicao/(\d+)$', rota)
            if match_sugerir:
                id_filme = int(match_sugerir.group(1))
                dados = self.ler_corpo_json()
                resp, status = filmes.sugerir_edicao_filme(id_filme, dados)
                self.enviar_json(resp, status)
                return
            
            match_aprovar_edicao = re.match(r'^/api/filme/edicao/aprovar/(\d+)$', rota)
            if match_aprovar_edicao:
                id_edicao = int(match_aprovar_edicao.group(1))
                resp, status = filmes.aprovar_edicao_pendente(id_edicao)
                self.enviar_json(resp, status)
                return

            self.send_error(404, "Rota POST nao encontrada")

        except Exception as e:
            print(f"Erro no POST: {e}")
            self.enviar_json({"sucesso": False, "erro": str(e)}, 500)

    def do_GET(self):
        url_parsed = urlparse(self.path)
        rota = url_parsed.path
        
        if not rota.startswith('/api'):
            self.servir_arquivo_estatico(self.path)
            return

        try:
            if rota == '/api/filmes':
                resp, status = filmes.buscar_filmes_aprovados()
                self.enviar_json(resp, status)
                return

            if rota == '/api/filmes/pendentes':
                resp, status = filmes.buscar_filmes_pendentes()
                self.enviar_json(resp, status)
                return
            
            if rota == '/api/filmes/edicoes-pendentes':
                resp, status = filmes.buscar_edicoes_pendentes()
                self.enviar_json(resp, status)
                return

            if rota == '/api/filmes/pesquisa':
                params = parse_qs(url_parsed.query)
                termo = params.get('q', [''])[0]
                resp, status = filmes.buscar_filmes_por_titulo(termo)
                self.enviar_json(resp, status)
                return

            match_genero = re.match(r'^/api/filmes/genero/(.+)$', rota)
            if match_genero:
                from urllib.parse import unquote
                nome_genero = unquote(match_genero.group(1))
                resp, status = filmes.buscar_filmes_por_genero(nome_genero)
                self.enviar_json(resp, status)
                return

            match_id = re.match(r'^/api/filme/(\d+)$', rota)
            if match_id:
                id_filme = int(match_id.group(1))
                resp, status = filmes.buscar_filme_por_id(id_filme)
                self.enviar_json(resp, status)
                return

            self.send_error(404, "Rota GET nao encontrada")

        except Exception as e:
            print(f"Erro no GET: {e}")
            self.enviar_json({"sucesso": False, "erro": str(e)}, 500)

    def do_PUT(self):
        rota = urlparse(self.path).path
        try:
            match_atualizar = re.match(r'^/api/filme/(\d+)$', rota)
            if match_atualizar:
                id_filme = int(match_atualizar.group(1))
                dados = self.ler_corpo_json()
                resp, status = filmes.atualizar_filme(id_filme, dados)
                self.enviar_json(resp, status)
                return
            
            self.send_error(404, "Rota PUT nao encontrada")
        except Exception as e:
             self.enviar_json({"sucesso": False, "erro": str(e)}, 500)

    def do_DELETE(self):
        rota = urlparse(self.path).path
        try:
            match_remover = re.match(r'^/api/filme/remover/(\d+)$', rota)
            if match_remover:
                id_filme = int(match_remover.group(1))
                resp, status = filmes.remover_filme_aprovado(id_filme)
                self.enviar_json(resp, status)
                return

            match_recusar = re.match(r'^/api/filme-pendente/recusar/(\d+)$', rota)
            if match_recusar:
                id_pendente = int(match_recusar.group(1))
                resp, status = filmes.recusar_filme_pendente(id_pendente)
                self.enviar_json(resp, status)
                return
            
            match_recusar_edicao = re.match(r'^/api/filme/edicao/recusar/(\d+)$', rota)
            if match_recusar_edicao:
                id_edicao = int(match_recusar_edicao.group(1))
                resp, status = filmes.recusar_edicao_pendente(id_edicao)
                self.enviar_json(resp, status)
                return

            self.send_error(404, "Rota DELETE nao encontrada")
        except Exception as e:
            self.enviar_json({"sucesso": False, "erro": str(e)}, 500)

if __name__ == "__main__":
    if not os.path.exists(DIRETORIO_FRONT):
        os.makedirs(DIRETORIO_FRONT)
        print(f"Nota: Pasta '{DIRETORIO_FRONT}' verificada.")

    print(f"Servidor Rodando Python Puro em http://localhost:{PORTA}")
    print("Pressione Ctrl+C para parar.")
    
    socketserver.TCPServer.allow_reuse_address = True
    
    with socketserver.TCPServer(("", PORTA), ManipuladorDeRequisicoes) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServidor parado.")
            httpd.server_close()