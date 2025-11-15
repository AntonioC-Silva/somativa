import banco
import hashlib
import os
import jwt
import datetime

SECRET_KEY = "sua_chave_secreta_super_segura_aqui"

def criar_hash_senha(senha):
    salt = os.urandom(32)
    key = hashlib.pbkdf2_hmac('sha256', senha.encode('utf-8'), salt, 100000)
    return salt.hex() + ':' + key.hex()

def verificar_senha_hash(senha_fornecida, hash_armazenado):
    try:
        salt_hex, key_hex = hash_armazenado.split(':')
        salt = bytes.fromhex(salt_hex)
        nova_key = hashlib.pbkdf2_hmac('sha256', senha_fornecida.encode('utf-8'), salt, 100000)
        return nova_key.hex() == key_hex
    except Exception:
        return False

def registrar_usuario(usuario, senha):
    if not usuario or not senha:
        return {"sucesso": False, "erro": "usuário e senha são obrigatórios"}, 400
    
    query_verificacao = "select * from usuario where nome = %s"
    if banco.executar_query(query_verificacao, (usuario,), fetch_one=True):
        return {"sucesso": False, "erro": "usuário já existe"}, 409
        
    senha_hash = criar_hash_senha(senha)
    
    query_insercao = "insert into usuario (nome, senha) values (%s, %s)"
    id_usuario = banco.executar_query(query_insercao, (usuario, senha_hash), commit=True)
    
    if id_usuario:
        return {"sucesso": True, "id_usuario": id_usuario}, 201
    else:
        return {"sucesso": False, "erro": "erro ao registrar usuário"}, 500

def logar_usuario(usuario, senha):
    if not usuario or not senha:
        return {"sucesso": False, "erro": "usuário e senha são obrigatórios"}, 400
        
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
            token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")
            
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
        token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")

        return {
            "sucesso": True, 
            "usuario": {"id": usuario_adm['id_adm'], "nome": usuario_adm['nome']},
            "tipo": "adm",
            "token": token
        }, 200
    
    return {"sucesso": False, "erro": "usuário ou senha inválidos"}, 401