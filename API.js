
function f1 () {
    console.log('exportando');
}

function f2 () {
    console.log('exportando f2');

}
class App {
    constructor(app){
        this.app = app;
        console.log(app);
    }
    porta1 = this.app.get((req, res)=>{
        
    })
}

module.exports = {f1, f2, App};