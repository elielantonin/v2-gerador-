from flask import Flask, request, jsonify
import sqlite3

app = Flask(__name__)

# Função para conectar ao banco de dados
def get_db():
    conn = sqlite3.connect('produtos.db')
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/produtos', methods=['POST'])
def add_produto():
    try:
        dados = request.get_json()
        numero = dados.get('numero')
        nome = dados.get('nome')
        preco = dados.get('preco')
        imagem = dados.get('imagem')  # Imagem recebida em base64

        if not (numero and nome and preco):
            return jsonify({'error': 'Todos os campos são obrigatórios'}), 400

        conn = get_db()
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO produtos (numero, nome, preco, imagem)
            VALUES (?, ?, ?, ?)
        ''', (numero, nome, preco, imagem))
        conn.commit()
        conn.close()

        return jsonify({'message': 'Produto cadastrado com sucesso!'}), 201

    except sqlite3.IntegrityError:
        return jsonify({'error': 'Produto com este número já existe'}), 409
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
