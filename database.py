import sqlite3

def init_db():
    conn = sqlite3.connect('produtos.db')
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS produtos (
            numero TEXT PRIMARY KEY,
            nome TEXT NOT NULL,
            preco TEXT NOT NULL,
            imagem TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

# Chame essa função quando for iniciar o banco de dados
init_db()
