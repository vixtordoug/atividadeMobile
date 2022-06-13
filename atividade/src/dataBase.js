import SQLite from 'react-native-sqlite-storage';

SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = 'atividade.db';
const database_version = '1.0';
const database_displayname = 'SQLite React Offline Database';
const database_size = 200000;

export default class Db {
    //aqui teremos os métodos

    //Inicialização/ Criação do Banco de Dados
    initDb() {
        let db;
        SQLite.openDatabase(
            database_name,
            database_version,
            database_displayname,
            database_size,
        )
            .then(DB => {
                db = DB;
                db.transaction(function (tx) {
                    tx.executeSql(
                        "SELECT name FROM sqlite_master WHERE type='table' AND name='usuario'",
                        [],
                        function (tx, result) {
                            console.log('intem', result.rows.length);
                            if (result.rows.length == 0) {
                                tx.executeSql('DROP TABLE IF EXISTS usuario', []);
                                tx.executeSql(
                                    'CREATE TABLE IS NOT EXISTS usuario(id INTEGER PRIMARY KEY AUTOINCREMENT, nome VARCHAR(20), senha VARCHAR(8))',
                                    []
                                );
                            }
                        }
                    );
                });
            })

    }

    //Alimentação da Tabela de Usuários com seus dados
    addUsuario(usuario) {
        let db;
        SQLite.openDatabase(
            database_name,
            database_version,
            database_displayname,
            database_size,
        )
            .then(DB => {
                db = DB;
                db.transaction((tx) => {
                    tx.executeSql('INSERT INTO usuario (nome, senha) VALUES (?,?)',
                        [usuario.nome_usuario, usuario.senha_usuario], (tx, results) => {
                            if (results.rowsAffected > 0) {
                                Alert.alert('Cadastro', 'Resgistro Inserido com sucesso');
                            } else {
                                Alert.alert('Erro no Cadastro');
                            }
                        }
                    );
                })
            })

    }

    //Alterar informações dos usuários
    updateUsuario(usuario) {
        let db;
        SQLite.openDatabase(
            database_name,
            database_version,
            database_displayname,
            database_size,
        )
            .then(DB => {
                db = DB;
                db.transaction((tx) => {
                    tx.executeSql('UPDATE usuario SET nome = ? senha = ? WHERE id = ?',
                        [
                            cliente.nome_usuario,
                            cliente.senha_usuario,
                            cliente.id_usuario
                        ], (tx, results) => {
                            if (results.rowsAffected > 0) {
                                Alert.alert('Alteração', 'Dados alterado com Sucesso');
                            } else {
                                Alert.alert('Alteração', 'Erro na alteração');
                            }
                        });
                })
            })
    }

    //excluir um usuário
    deleteUsuario(usuario) {
        let db;
        SQLite.openDatabase(
            database_name,
            database_version,
            database_displayname,
            database_size,
        )
            .then(DB => {
                db = DB;
                db.transaction((tx) => {
                    tx.executeSql('DELETE FROM usuario WHERE id = ?',
                        [
                            cliente.id_usuario
                        ], (tx, results) => {
                            if (results.rowsAffected > 0) {
                                Alert.alert('Exclusão', 'Usuário excluído com Sucesso');
                            } else {
                                Alert.alert('Exclusão', 'Erro na exclusão');
                            }
                        });
                })
            })
    }

}