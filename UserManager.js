const fs= require('fs');
const pathToIdeas = './ideas.json';

class contenedor {
    save = async (idea) => {
        if(!idea.descripcion) return {status: 'error', error: 'Faltan datos'};
        try{
            if(fs.existsSync(pathToIdeas)){
                let data = await fs.promises.readFile(pathToIdeas,'utf-8')
                let ideas = JSON.parse(data);
                let id =ideas[ideas.length-1].id+1;
                idea.id = id;
                ideas.push(idea);
                await fs.promises.writeFile(pathToIdeas,JSON.stringify(ideas,null,2))
                return {status:"succes",message:`Idea creada con id = ${idea.id}`}
            }
            else{
                idea.id=1;
                await fs.promises.writeFile(pathToIdeas, JSON.stringify([idea],null,2))
                return {status: 'success',message: `Idea creada con id = ${idea.id}`}
            }
        }catch(error){
            return {status: 'error', message: error}
        }
    }
    getById = async(id)=>{
        if(fs.existsSync(pathToIdeas)){
            let data = await fs.promises.readFile(pathToIdeas,'utf-8')
            let ideas = JSON.parse(data);
            let idea= ideas.find(u=>u.id===id);
            if(idea) return {status:'success',idea:idea}
            else return {status:'error',error:'not found'}
        }
    }
    getAll = async () => {
        if(fs.existsSync(pathToIdeas)){
            let data = await fs.promises.readFile(pathToIdeas,'utf-8')
            let ideas = JSON.parse(data)
            return {status:'success', array: ideas}
        }else{
            return{error: 'error',message:error}
        }
    }
    deleteById=async(id)=>{
        if(!id) return {status:'error',error:'necesita id'}
        if(fs.existsSync(pathToIdeas)){
            let data = await fs.promises.readFile(pathToIdeas,'utf-8')
            let ideas = JSON.parse(data);
            let newideas = ideas.filter(idea=>idea.id!==id)
            await fs.promises.writeFile(pathToIdeas,JSON.stringify(newideas,null,2))
            return {status:'success',message:'Deleted Idea'}
        }
    }
    deleteAll = async () => {
        if(fs.existsSync(pathToIdeas)){
            let data = await fs.promises.readFile(pathToIdeas,'utf-8')
            let ideas = JSON.parse(data);
            if(ideas.length===0){return {status:'success',message:'Not object exist'}}
            else{
                let borrar = '';
                await fs.promises.writeFile(pathToIdeas,JSON.stringify(borrar,null,2))
            }
        }else{
            return {status:'error',message:'Not text exist'}
        }
    }
    
}
module.exports = contenedor;