window.addEventListener('load', carregado);

var db = openDatabase("MyCarrete", "1.0", "TiPS Database Example", 2 * 1024 * 1024);



function carregado(){    
    
    document.getElementById('btn-salvar').addEventListener('click', salvar);
    
    db.transaction(function(tx) {
        //tx.executeSql("DROP TABLE myTable" );
        tx.executeSql("CREATE TABLE IF NOT EXISTS myTable ( id INTEGER PRIMARY KEY,nome TEXT,senha TEXT, email TEXT)" );
//        tx.executeSql('INSERT INTO myTable ( nome,senha,email) VALUES ("a", "b", "c")');
    });
    
}   

function salvar(){
    var id = document.getElementById('field-id').value;
    var name = document.getElementById('field-name').value;
    var pass = document.getElementById('field-pass').value;
    var mail = document.getElementById('field-mail').value;

    db.transaction(function(tx) {
        if(id){
            tx.executeSql('UPDATE myTable SET nome=?, senha=?, email=? WHERE id=?', [name,pass,mail,id],null);
        }else{
            tx.executeSql('INSERT INTO myTable ( nome,senha,email) VALUES (?, ?, ?)', [name,pass,mail]);
        }
    });
    limpaCampo();
    inputSHOW(false);
}

function atualizar(_id){   
    
    var id = document.getElementById('field-id');
    var name = document.getElementById('field-name');
    var pass = document.getElementById('field-pass');
    var mail = document.getElementById('field-mail');
    
    id.value = _id;
    
    db.transaction(function(tx) {
        tx.executeSql('SELECT * FROM myTable WHERE id=?', [_id], function (tx, resultado) {
            var rows = resultado.rows[0];

            name.value = rows.name ;
            pass.value = rows.pass ;
            mail.value = rows.email ;
        });
    });
    inputSHOW(true);
}

function deletar(){
    
    var id = document.getElementById('field-id').value;
    
    db.transaction(function(tx) {
        tx.executeSql("DELETE FROM myTable WHERE id=?", [id]);
    });
    
    mostrar();
    limpaCampo();
    inputSHOW(false);
}