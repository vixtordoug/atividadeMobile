import SQLite from 'react-native-sqlite-storage';
SQLite.DEBUG(true);
SQLite.enablePromise(true);
const database_name = 'Empresa.db';
const database_version = '1.0';
const database_displayname = 'SQLite React Offline Database';
const database_size = 200000;
export default class Db {

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
                        "SELECT name FROM sqlite_master WHERE type='table' AND name='cliente'",
                        [],
                        function (tx, result) {
                            console.log('item:', result.rows.length);
                            if (result.rows.length == 0) {
                                tx.executeSql('DROP TABLE IF EXISTS cliente', []);
                                tx.executeSql(
                                    'CREATE TABLE IF NOT EXISTS cliente(id INTEGER PRIMARY KEY AUTOINCREMENT, nome VARCHAR(20), senha VARCHAR(8))',
                                    []
                                );
                            }
                        }
                    );
                });
            })
    }

    addCliente(cliente) {
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
                    tx.executeSql('INSERT INTO cliente (nome, senha) VALUES (?,?)',
                        [cliente.nome_cliente, cliente.senha_cliente], (tx, results) => {
                            if (results.rowsAffected > 0) {
                                Alert.alert('Cadastro', 'Registro Inserido com Sucesso');
                            } else {
                                Alert.alert('Erro no Cadastro');
                            }
                        });
                })
            })
    }

    updateCliente(cliente) {
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
                    tx.executeSql('UPDATE cliente SET nome = ? senha = ? WHERE id = ?',
                        [
                            cliente.nome_cliente,
                            cliente.senha_cliente,
                            cliente.id_cliente
                        ], (tx, results) => {
                            if (results.rowsAffected > 0) {
                                Alert.alert('Altera????o', 'Dados alterado com Sucesso');
                            } else {
                                Alert.alert('Altera????o', 'Erro na altera????o');
                            }
                        });
                })
            })
    }

    deletarCliente(cliente) {
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
                    tx.executeSql('DELETE FROM cliente WHERE id = ?',
                        [
                            cliente.id_cliente
                        ], (tx, results) => {
                            if (results.rowsAffected > 0) {
                                Alert.alert('Exclus??o', 'Cliente exclu??do com Sucesso');
                            } else {
                                Alert.alert('Exclus??o', 'Erro na exclus??o');
                            }
                        });
                })
            })
    }
}