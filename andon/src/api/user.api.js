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
    }

 
  };