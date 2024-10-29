//const functions = require('./API');asdsauiehsahd
const express = require('express');
const app = express();
const port  = 80;
const cors = require('cors');
app.use(cors());
console.log("rodando em : " + port);
app.listen(port, ()=>{console.log('rodando')});
app.set('view engine', 'ejs');
app.use(express.static('public'));
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

module.exports = app;
const arquivos = require('fs');
const { text } = require('body-parser');
const { redirect } = require('express/lib/response');
const { required } = require('nodemon/lib/config');
//const res = require('express/lib/response');
var linkvalores;
var auxdiretorio = "Marcio Almeida";
var diretorio = "./";
try{
    arquivos.readFile("./---diretorioconf", 'utf8',(err,data)=>{
        if(err){diretorio = "./";
        }
        else{diretorio = data;}
    });
}
catch{
    console.log("catch: ");
    arquivos.writeFile("C:/---diretorioconf", "./", ()=>{});
}
var dcontrole = "controle";
var teste1 = "Venda1.00";


const d = new Date();

var aux;
var edicao = false;
var nome; 
var link;

var dados = new Object(); 
dados = {nome, link}
var diretorioControle = "C:/Users/"+auxdiretorio+"/Documents/OneDrive Google/OneDrive/"+teste1+"/controle";
var diretorioClientes = "C:/Users/"+auxdiretorio+"/Documents/OneDrive Google/OneDrive/"+teste1+"/";
var ldados = [];
ldados[0] = {};
ldados[0] = ldados[0].nome = "marcio";
ldados[1] = {}
ldados[1] = ldados[1].nome = "Nicolas";

var valores;
/*
String.prototype.replaceAll = function (exp1, exp2) {
    var existechar = true;
    var aux = " ";
    aux = this;
    aux2 = this;
    while(existechar){
        console.log("replacando")
        aux = this.replace(exp1, exp2);
        if(aux === aux2)existechar=false;
        aux2 = aux;
    }
    console.log("dps do replace :"  + aux)
    return aux;
};
*/
var datenow = ()=>{
    var dia = d.getDate(); + "-"  + d.getFullYear();
    var mes = d.getMonth() + 1;
    if(mes<10)mes = "0" + mes.toString();
    var ano = d.getFullYear();
    ano = ano % 1000;
    var hora = d.getHours() + ":" + d.getMinutes();
    var data = dia +"-"+ mes +"-"+ ano;
    var dehora = data +" "+ hora;
    return dehora;
}
var somar  = (textos)=>{
    
    textos = textos.replaceAll("\n", " ");
    textos = textos.replaceAll(",", ".");
    textos = textos.split(" ");
    //console.log("Textos : " + textos);
    var total = 0.0;
    //console.log("textos.length: " + textos.length)
    for(var i=0; i<textos.length; i++){
        //console.log("valor"+i+":"+parseFloat(textos[i]))
        //textos[i] = parseFloat(textos[i]);
        //console.log("pos"+i+": "+textos[i]);
        var perchar = textos[i].split("");
        var teste = 0;
        for(var j = 0; j<perchar.length; j++){
            //console.log("testando: " + perchar[j]);
            if((perchar[j] <= "9" && perchar[j] >= "0") || perchar[j] === "." || perchar[j] === "-" || perchar[j] === "+" || perchar[j]==="*"){
                //console.log("entrou");
            }else{teste++};
        }

        
        if(textos[i].includes("*")&&textos[i].includes(".") && teste === 0){
            
            var auxxsoma = []; 
            auxxsoma = textos[i].split("*"); 
            auxxsoma[0] = parseFloat(auxxsoma[0]);
            
            auxxsoma[1] = parseFloat(auxxsoma[1]);
            //console.log("multiplicando : " + auxxsoma[0] + " e " + auxxsoma[1]);

            if(!isNaN(auxxsoma[0]) && !isNaN(auxxsoma[1])){total += auxxsoma[0] * auxxsoma[1];}else{/*console.log("nao somado, por é NaN")*/}
            //total = auxxsoma[0] * auxxsoma[1]  + total;
            //isNumber(total);
        }else
        if(textos[i].includes(".") && teste === 0){
            textos[i] = parseFloat(textos[i]);
            //console.log("somando : " + textos[i]);
        if(!isNaN(textos[i])){total += textos[i];}else{/*console.log("nao somado, pq é NaN")*/}
            //isNumber(total);
        }
        
        
        //if(!isNaN(textos[i]))total += parseFloat(textos[i]);
    }
    //console.log("total de : " + total);
    return total.toFixed(2);
}

function alimentaDados(valores){
    var ldados = [];
    for(i=0; i<valores.length; i++){
        if(valores[i].length>1){
            ldados[i] = {};
            ldados[i].nome = valores[i].toUpperCase();
            ldados[i].link = valores[i].toUpperCase();
            ldados[i].link = "/cliente/"+ldados[i].link.replaceAll(" ", "_")
        }
    }
    return ldados;
}

//alimenta tabela de clientes

var quebraspace = (texto)=>{
    var newtxt = "";

    var textospli;
    textospli = texto.replaceAll("\r", "\n")
    var textosplit = [];
    textosplit = textospli.split("\n");
    //console.log("textosplit 175 : " + textosplit + "tamanho :" + textosplit.length);
    var aux = 0;
    for(var i=0; i<textosplit.length; i++){
        if(textosplit[i].length === 0){newtxt+= "\n"; aux++;}
        else if(textosplit[i].length > 0){
            newtxt += textosplit[i] + "\n";
            aux=0;
        }
            
        
    }

    newtxt = newtxt.split("\n");
    //console.log("linha 188: texto: " + newtxt)
    return newtxt;
}

//FUNCOES POST
{
    app.post('/salvarperguntas', (req,res)=>{
        var titulo = req.body.titulo;
        var descricao = req.body.descricao;
        
        //console.log("dados : " + titulo + "\n" + descricao);
        res.send('form recebido');
    })
    function getDMY(){
        var d = new Date();
        var dia = d.getDate(); + "-"  + d.getFullYear();
        var mes = d.getMonth() + 1;
        if(mes<10)mes = "0" + mes.toString();
        var ano = d.getFullYear();
        ano = ano % 1000;
        
        var data = dia +"-"+ mes +"-"+ ano;
        return data; 
    }
    app.post("/realcompra", (req,res)=>{
        var d;
        d = new Date();
       // var dia = d.getDate(); + "-"  + d.getFullYear();
       // var mes = d.getMonth() + 1;
       // if(mes<10)mes = "0" + mes.toString();
       // var ano = d.getFullYear();
       // ano = ano % 1000;
        var hora = d.getHours() + ":" + d.getMinutes();
        var data = getDMY();
        var dehora = data +" "+ hora;
        var compra = req.body.compra;
        var nome = req.body.nome;
        //console.log("no real compra : "+ nome);
        var pag = nome.replaceAll(" ", "_");
        //console.log("testando123");
        //var dehora = datenow();
        //console.log("dehora : " + dehora);
        compra = " \n" + dehora + "\n" + compra +"\n";
        
        //console.log(diretorio);

        if(data!==nome)arquivos.appendFile(diretorio + data + '-fiado', "ANOTADO: para #link" + nome + "#link\n"+ compra + "\n", ()=>{console.log("anotado em: " +diretorio+data)});
        arquivos.appendFile(diretorio + nome, compra, ()=>{console.log('anotado')});
        
        res.redirect("cliente/" + pag);
        /*res.render('cliente.ejs',{
            nome:nome,
            ldados:ldados,
            dadostxt: valores});*/
    })
    app.post("/busca", (req, res)=>{
        var nome = req.body.busca;
        var pag = "";
        nome = nome.toUpperCase();
        pag = nome.replaceAll(" ", "_");
        console.log("na busca : " + pag);
        arquivos.readFile(diretorio + nome, "utf8", (err,data)=>{
            valores = data;
            var aux;
            aux = data;
            
            var total = 0.0;
            try {
                aux = data.replaceAll("\r", "\n");
                total = somar(aux);
                valores = valores.split("\n");
            
            } catch (error) {
                console.log(error);
            }
            res.redirect("cliente/"+pag);
            //res.redirect("cliente/" + pag,{});
            /*res.render('cliente.ejs',{
                nome:nome,
                linkvalores:linkvalores,
                dadostxt: valores});*/
        })
    })

    app.post("/salvarconf", (req,res)=>{

        console.log("novo diretorio = :" + req.body.diretorio);
        diretorio = req.body.diretorio;
        arquivos.writeFile("./---diretorioconf", diretorio, (err)=>{
            if(err)console.log(err);
        });
        res.redirect("configuracoes");
    })
    var msg;
    app.post("/salvarcliente",(req,res)=>{
        var novocliente = req.body.nome;
        //var cpf = req.body.cpf;
        var controle;
        arquivos.readFile(diretorio+dcontrole,'utf8',(err,data)=>{
            try {
                console.log("1")
                controle = data;
                console.log("2")
                controle = controle.replaceAll("\r", "\n");
                console.log("3")
                controle = controle.split("\n");
                console.log("4")
                var existe =  false;
                console.log("novocliente : "+novocliente+"tam : "+controle.length)

                for(var i =0; i<controle.length; i++){
                    if(controle[i] === novocliente){
                        existe = true;
                        i = controle.length;
                    }
                    
                    console.log("for")
                }
                if(!existe){
                    
                    console.log("antes for : " +diretorio+dcontrole+ " " + novocliente)
                    arquivos.appendFile(diretorio+dcontrole, novocliente+"\n\n", (err)=>{
                        arquivos.writeFile(diretorio+novocliente, "criacão", ()=>{
                            novocliente = novocliente.replaceAll(" ", "_");
                            res.redirect("cliente/" + novocliente);
                        })
                        if(err)console.log("algo deu erado");
                    });
                    
                    
                }
                else{
                    console.log("2")
                    msg = "Cliente " + novocliente +" já Cadastrado";
                    res.redirect("telamsg");
                } 
            } catch (error) {
                arquivos.writeFile(diretorio+dcontrole, novocliente+"\n\n", ()=>{
                    console.log("novocliente : " + novocliente)
                    arquivos.writeFile(diretorio+novocliente, "criacão", ()=>{
                        novocliente = novocliente.replaceAll(" ", "_");
                        res.redirect("cliente/" + novocliente);
                    })

                })
                
            }
            
        })
    })

    app.post("/openeditor", (req,res)=>{
        try {
            var pag =  "";
            pag = req.body.nome.replaceAll(" ", "_");
            edicao = !edicao;
            res.redirect("cliente/" + pag);
        } catch (error) {
            console.log(error)
            res.redirect("fendaateu");
        }
        
        
    })
    app.post("/realpagamento", (req,res)=>{
        var d;
        d = new Date();
        var compra = req.body.pagamento;
        var nome = req.body.nome;
        console.log("no real compra : "+ nome);
        var pag = nome.replaceAll(" ", "_");
        console.log("testando123");
        var dia = d.getDate(); + "-"  + d.getFullYear();
        var mes = d.getMonth() + 1;
        if(mes<10)mes = "0" + mes.toString();
        var ano = d.getFullYear();
        ano = ano % 1000;
        var hora = d.getHours() + ":" + d.getMinutes();
        var data = dia +"-"+ mes +"-"+ ano;
        var dehora = data +" "+ hora;
    
    
        compra = compra.replaceAll(",", ".");
        compra = parseFloat(compra);
        compra = compra.toFixed(2);
        compra = -1.0 * compra;
        if(!isNaN(compra)){
            console.log("erro if ")
            if(data!==nome)arquivos.appendFile(diretorio + data, "PAGAMENTO: de " + nome + " valor: " + (-1.0*compra).toFixed(2) + "\n", ()=>{console.log("pagamento em: " +diretorio+data)});
            compra = "\n"+ dehora + `\n---pagamento de: ${compra.toFixed(2)} \n`;
        
            console.log(diretorio);
        
            //if(data!==nome)arquivos.appendFile(diretorio + data, "PAGAMENTO: de " + nome + "\n"+ compra, ()=>{console.log("pagamento em: " +diretorio+data)});
            arquivos.appendFile(diretorio + nome, compra, ()=>{console.log('pagamento recebido')});
            
            res.redirect("cliente/" + pag);

        }else{
            erro = "Valor Incompreensivel. Digite o numero Corretamente";
            res.redirect("cliente/" + pag)
        }

    })


    app.post("/edicoes", (req, res)=>{
        console.log(req.body);
        var nome = req.body.nome;
        var pag = req.body.nome.replaceAll(" ", "_")
        var texto = req.body.edicoes;
        console.log("texto 398 entrando quebraspace: " + texto);
        texto = quebraspace(texto);
        var newtxt = "";
        var aux = 0;
        for(var i=0; i<texto.length; i++){
            if(texto[i].length >0){
                newtxt += texto[i] + "\n";
            }
            //else newtxt += texto[i] + "\n";
            
        }
        console.log("new txt :" +newtxt);
        console.log("edicoes :" +texto);
        arquivos.writeFile(diretorio + nome, newtxt, ()=>{res.redirect("cliente/" + pag)})
        //res.redirect("cliente/" + pag)
    })


}

//FUNCOES GET 
{
    app.get("/paginaunica", (req,res)=>{
        res.render("paginaunica.ejs")
    })
    app.get('/cliente/:pagina?', (req,res)=>{
        var aux;
        var nome = req.params.pagina;
        nome = nome.replaceAll("_", " ");
        console.log("diretorio : " + diretorio+nome)
        arquivos.readFile(diretorio + nome, "utf8", (err,data)=>{
            valores = data;
            

            var total = 0.0;
            try {
                aux = data.replaceAll("\r", " ");
                total = somar(aux);
                valores = valores.replaceAll("\r", "\n");
                valores = quebraspace(valores);         
                //console.log("oq vai passar pra pag : " +valores);
                
            } catch (error) {
                console.log(error);
            }
            //console.log(valores);
            console.log("cliente pagina : " +nome);
            res.render('cliente.ejs',{
                ldados:ldados,
                nome: nome,
                total: total,
                dadostxt: valores,
                edit: edicao
            });
        })
    })

    var dataJSON = {
        data: '',
    }
    
    app.get('/fendaateu', (req,res) =>{
        var valores;
        var nome;
        nome = false;
        arquivos.readFile(diretorio+dcontrole, "utf8", (err,data)=>{
            try{
                valores = data;
                valores = quebraspace(valores);
                valores.sort();
                var i = 0 ;
                console.log(valores)
                ldados = alimentaDados(valores);
                console.log(ldados);
                console.log(nome);
                res.render('fendaateu.ejs', {ldados:ldados, nome:nome});

            }catch{
                res.render("fendaateu.ejs", {ldados:ldados, nome:nome},)
            }
        });
        
        
    });

    app.get('/fetchControle', (req,res) =>{
        var valores;
        var nome;
        console.log('teste')
        nome = false;
        arquivos.readFile(diretorio+dcontrole, "utf8", (err,data)=>{
            try{
                res.json(data);
            }catch{
                res.render("fendaateu.ejs", {ldados:ldados, nome:nome},)
            }
        });
        
        
    });
    app.get("/addCliente.ejs", (req,res)=>{
        //console.log("hello");
        res.render("addCliente.ejs");
    })

    app.get('/perguntar', (req,res)=>{
        res.render('perguntar.ejs');
    });
    app.get('/cliente', (req,res)=>{
        res.render('cliente.ejs');
    })

    app.get('/', (req, res)=>{
        res.render('index.ejs');    
    });

    app.get('/precos', (req,res)=>{
        res.render('precos.ejs');

    });
    app.get('/clienteteste', (req,res)=>{
        res.render('fendaateu.ejs');
    });


    app.get("/telamsg", (req,res)=>{
        res.render("telamsg.ejs", {msg : msg});
    })
    app.get("/configuracoes", (req, res)=>{
        
        res.render("configuracoes.ejs", {diretorio : diretorio});
    })
    app.get("/diario", (req,res)=>{
    var dia = d.getDate(); + "-"  + d.getFullYear();
    var mes = d.getMonth() + 1;
    if(mes<10)mes = "0" + mes.toString();
    var ano = d.getFullYear()%1000;
    var data = dia+"-"+mes+"-"+ano;
    res.redirect("cliente/" + data);
    })


    app.post('/fetch', (req,res)=>{
        //console.log(req.body);
        var {name} = req.body;
        //console.log(name)
        arquivos.readFile(diretorio + name, "utf8", (err,data)=>{
            //console.log(data);
            setTimeout(() => {
                //dataJSON.data = "MarcioAbreu"
                res.json({data: data, name: name});
                //console.log(typeof(dataJSON));
            }, 200);
        })
    })
    app.post('/API/edicoes', (req,res)=>{
        //console.log(req.body);
        res.json(req.body);
    })
    
    app.post("/fetchCompra", (req,res)=>{
        console.log(req.body);
        var d;
        d = new Date();
        var hora = d.getHours() + ":" + d.getMinutes();
        var data = getDMY();
        var dehora = data +" "+ hora;
        var compra = req.body.compra;
        var nome = req.body.name;
        compra = " \n" + dehora + "\n" + compra +"\n";
        
        //console.log(diretorio);

        if(data!==nome){
            arquivos.appendFile(diretorio + data + '-fiado', "ANOTADO: para #link" + nome + "#link\n"+ compra + "\n", ()=>{});

        }
        console.log('ESTE CONSOLE', 'dir',diretorio, 'nome', nome,'compra', compra);
        arquivos.appendFile(diretorio + nome, compra, (err) => {
            if (err) {
                console.error('Erro ao escrever no arquivo', err);
                return res.status(500).json({ error: 'Erro ao escrever no arquivo' });
            }
        
            // Após a escrita, ler o conteúdo do arquivo
            arquivos.readFile(diretorio + nome, 'utf8', (err, data) => {
                if (err) {
                    console.error('Erro ao ler o arquivo', err);
                    return res.status(500).json({ error: 'Erro ao ler o arquivo' });
                }
        
                // Retornar o conteúdo do arquivo
                console.log('Arquivo atualizado:', data);
                res.json({ conteudo: data });
            });
        });
    })

    app.post('/editLine', (req, res)=>{
        // console.log(req.body);
        editFileLine(req, res);
        // res.json({msg: 'Editando Linhas'});
    })


    const fs = require('fs');
    const path = require('path');

function editFileLine(req, res) {
    const { fileName, lineText, lineNumber } = req.body;
    console.log('REQ.BODY', req.body)
    if (!fileName || lineNumber === undefined) {
        return res.status(400).json({ error: "Parâmetros 'fileName', 'lineText' e 'lineNumber' são necessários." });
    }

    const absolutePath = diretorio + req.body.fileName;

    fs.readFile(absolutePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: `Erro ao ler o arquivo: ${err.message}` });
        }

        // Dividir o conteúdo do arquivo em um array de linhas
        const lines = data.split('\n');

        // Verificar se a linha especificada existe
        if (lineNumber < 0 || lineNumber >= lines.length) {
            return res.status(400).json({ error: "O número da linha está fora do intervalo." });
        }

        // Atualizar a linha específica
        lineText==='' ? lines[lineNumber] = 'chubaka' : lines[lineNumber] = lineText;

        // Juntar as linhas novamente em uma string
        const updatedContent = lines.join('\n');

        // Escrever o conteúdo atualizado de volta ao arquivo
        console.log('PATH: ', absolutePath, 'DATA: ', updatedContent);
        fs.writeFile(absolutePath, updatedContent, 'utf8', (err) => {
            if (err) {
                return res.status(500).json({ error: `Erro ao salvar o arquivo: ${err.message}` });
            }

            res.json({ message: "Linha editada com sucesso!" });
        });
    });
}

module.exports = editFileLine;

}   

