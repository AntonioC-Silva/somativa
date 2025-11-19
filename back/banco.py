import mysql.connector
from mysql.connector import pooling
from decimal import Decimal
import json

db_config = {
    'host': "localhost",
    'user': "root",
    'password': "senai", 
    'database': "webserver",
}

# cria o pool de conexoes (singleton) na inicializacao
try:
    db_pool = pooling.MySQLConnectionPool(pool_name="webserver_pool",
                                          pool_size=5,
                                          **db_config)
    print("pool de conexoes singleton criado com sucesso")
except mysql.connector.Error as err:
    print(f"erro ao criar o pool de conexoes: {err}")
    db_pool = None

# pega uma conexao livre do pool
def get_connection_from_pool():
    if db_pool is None:
        print("erro: pool de conexoes nao esta disponivel")
        return None
    try:
        return db_pool.get_connection()
    except mysql.connector.Error as err:
        print(f"erro ao obter conexao do pool: {err}")
        return None

# executa qualquer query sql usando o pool de conexoes
def executar_query(query, params=None, fetch_one=False, fetch_all=False, commit=False):
    conexao = get_connection_from_pool()
    if conexao is None:
        print("falha ao obter conexao para a query")
        return None
        
    cursor = conexao.cursor(dictionary=True)
    try:
        cursor.execute(query, params)
        
        if commit:
            conexao.commit()
            return cursor.lastrowid
            
        resultado = None
        if fetch_one:
            resultado = cursor.fetchone()
        elif fetch_all:
            resultado = cursor.fetchall()
            
        return resultado
        
    except mysql.connector.Error as err:
        print(f"erro na query: {err}")
        conexao.rollback()
        return None
    finally:
        # devolve a conexao para o pool
        if conexao:
            cursor.close()
            conexao.close()

# converte o tipo 'decimal' do mysql para float no json
def conversor_json(o):
    if isinstance(o, Decimal):
        return float(o)
    raise TypeError(f"objeto do tipo {o.__class__.__name__} nao e serializavel em json")