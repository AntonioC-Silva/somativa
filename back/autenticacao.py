import banco
import hashlib
import os
import jwt
import datetime

senha_seg= "senha_super_segura_rsrsrs"

# cria hash com salt para a senha
def criar_hash_senha(senha):
    salt = os.urandom(32)
    key = hashlib.pbkdf2_hmac('sha256', senha.encode('utf-8'), salt, 100000)
    return salt.hex() + ':' + key.hex()

# compara senha com hash usando o salt
def verificar_senha_hash(senha_fornecida, hash_armazenado):
    try:
        salt_hex, key_hex = hash_armazenado.split(':')
        salt = bytes.fromhex(salt_hex)
        nova_key = hashlib.pbkdf2_hmac('sha256', senha_fornecida.encode('utf-8'), salt, 100000)
        return nova_key.hex() == key_hex
    except Exception:
        return False

# cria usuario novo se o nome esta livre
def registrar_usuario(usuario, senha):
    if not usuario or not senha:
        return {"sucesso": False, "erro": "usuario e senha sao obrigatorios"}, 400
    
    query_verificacao = "select * from usuario where nome = %s"
    if banco.executar_query(query_verificacao, (usuario,), fetch_one=True):
        return {"sucesso": False, "erro": "usuario ja existe"}, 409
        
    senha_hash = criar_hash_senha(senha)
    
    query_insercao = "insert into usuario (nome, senha) values (%s, %s)"
    id_usuario = banco.executar_query(query_insercao, (usuario, senha_hash), commit=True)
    
    if id_usuario:
        return {"sucesso": True, "id_usuario": id_usuario}, 201
    else:
        return {"sucesso": False, "erro": "erro ao registrar usuario"}, 500

# loga usuario (comum ou adm) e gera um token
def logar_usuario(usuario, senha):
    if not usuario or not senha:
        return {"sucesso": False, "erro": "usuario e senha sao obrigatorios"}, 400
        
    query_usuario = "select * from usuario where nome = %s"
    usuario_comum = banco.executar_query(query_usuario, (usuario,), fetch_one=True)
    
    if usuario_comum:
        if verificar_senha_hash(senha, usuario_comum['senha']):
            payload = {
                "id": usuario_comum['id_usuario'],
                "nome": usuario_comum['nome'],
                "tipo": "comum",
                "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=24)
            }
            token = jwt.encode(payload, senha_seg, algorithm="HS256")
            
            return {
                "sucesso": True, 
                "usuario": {"id": usuario_comum['id_usuario'], "nome": usuario_comum['nome']},
                "tipo": "comum",
                "token": token
            }, 200

    query_adm = "select * from adm where nome = %s"
    usuario_adm = banco.executar_query(query_adm, (usuario,), fetch_one=True)
    
    if usuario_adm and usuario_adm['senha'] == senha:
        payload = {
            "id": usuario_adm['id_adm'],
            "nome": usuario_adm['nome'],
            "tipo": "adm",
            "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=24)
        }
        token = jwt.encode(payload, senha_seg, algorithm="HS256")

        return {
            "sucesso": True, 
            "usuario": {"id": usuario_adm['id_adm'], "nome": usuario_adm['nome']},
            "tipo": "adm",
            "token": token
        }, 200
    
    return {"sucesso": False, "erro": "usuario ou senha invalidos"}, 401

# checa se o token no header e de um admin
def verificar_token_admin(auth_header):
    if not auth_header:
        return False, "header de autorizacao ausente"
    
    partes = auth_header.split()
    
    if len(partes) != 2 or partes[0].lower() != 'bearer':
        return False, "header de autorizacao mal formatado (esperado: bearer token)"
        
    token = partes[1]
    try:
        payload = jwt.decode(token, senha_seg, algorithms=["HS256"])
        
        if payload.get('tipo') == 'adm':
            return True, payload
        else:
            return False, "permissao negada (nao e admin)"
            
    except jwt.ExpiredSignatureError:
        return False, "token expirado"
    except jwt.InvalidTokenError:
        return False, "token invalido"