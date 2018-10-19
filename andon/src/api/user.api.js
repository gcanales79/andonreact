import axios from "axios";

export default {


    postLogin:function(login){
        return axios.post(process.env.REACT_APP_API_URL + "/api/login",login);

    },
      getLogout:function(){
        return axios.get(process.env.REACT_APP_API_URL + "/logout")
    },

    getUser_dataOne:function(id){
        return axios.get(process.env.REACT_APP_API_URL + "/api/UserOne/"+id);

    },

    getUser_data:function(token){
        return axios.get(process.env.REACT_APP_API_URL + "/api/user_data",{headers:{"x-token":"Bearer " + token}})
    },
    //Agregar Usuarios
    postUser:function(usuario){
        return axios.post(process.env.REACT_APP_API_URL + "/api/usuarios",usuario)
    },
    //Agregar Operadores
    postOperador:function(operador){
        return axios.post(process.env.REACT_APP_API_URL + "/api/operadores",operador)
    },
    //Obtener Operadores
    getOperador:function(){
        return axios.get(process.env.REACT_APP_API_URL + "/api/operadores")
    },
    //Borrar Operador
    deleteOperador:function(id){
        return axios.delete(process.env.REACT_APP_API_URL + "/borrar/operador/"+id)
    },
    //Agregar Maquinas
    postMaquina:function(maquina){
        return axios.post(process.env.REACT_APP_API_URL + "/api/maquinas",maquina)
    },
    //Obtener Maquinas
    getMaquina:function(){
        return axios.get(process.env.REACT_APP_API_URL + "/api/maquinas")
    },
    //Borrar Maquina
    deleteMaquina:function(id){
        return axios.delete(process.env.REACT_APP_API_URL + "/borrar/maquina/"+id)
    },
    //Agregar Maquinas
    postFalla:function(falla){
        return axios.post(process.env.REACT_APP_API_URL + "/api/falla",falla)
    },
    //Obtener Maquinas
    getFalla:function(){
        return axios.get(process.env.REACT_APP_API_URL + "/api/falla")
    },
    //Borrar Maquina
    deleteFalla:function(id){
        return axios.delete(process.env.REACT_APP_API_URL + "/borrar/falla/"+id)
    }


 
  };