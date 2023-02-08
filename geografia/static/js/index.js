const listarPaises = async()=>{
    try{
        const response = await fetch("./paises");//petición con fecht trae una promesa (petición que puede tener una respuesta en el futuro , ahora o nunca) y await es para esperar esa respuiesta
        const data= await response.json();//obtenemos en contenido de la respuesta y lo desencriptamos de json y lo convertimos en un objeto de js nativo (constante data)
        
        if(data.message==="Success"){
            let opciones = ``;

            data.paises.forEach((pais)=>{
                opciones+=`<option value='${pais.id}'>${pais.nombre}</option>`//poblamos en el contenido traido del backend (que a su vez trae de la BD)
            });
            cboPais.innerHTML=opciones;//insertamos html en el select de id 'cboPais'

        }else{
            alert("Paises no encrontrados")
        }
        // console.log(data)

    }catch(error){
        console.log(error);
    }

};

const cargaInicial = async() => {
    await listarPaises();
};

window.addEventListener("load",async ()=> {
    await cargaInicial();
});