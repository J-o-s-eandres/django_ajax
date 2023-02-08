const listarCiudades = async(idPais)=>{

    try{
        const response = await fetch(`./ciudades/${idPais}`);//petición con fecht trae una promesa (petición que puede tener una respuesta en el futuro , ahora o nunca) y await es para esperar esa respuiesta
        const data= await response.json();//obtenemos en contenido de la respuesta y lo desencriptamos de json y lo convertimos en un objeto de js nativo (constante data)
        
        if(data.message==="Success"){//data.message viene desde la respuesta JSON de Django
            let opciones = ``;

            data.ciudades.forEach((ciudad)=>{
                opciones+=`<option value='${ciudad.id}'>${ciudad.nombre}</option>`//poblamos en el contenido traido del backend (que a su vez trae de la BD)
            });
            cboCiudad.innerHTML=opciones;//insertamos html en el select de id 'cboPais', si tenemos un elemento con un id en html podemos acceder a el sin el getElemntById, solo con el nombre del id

        }else{
            alert("Paises no encrontrados")
        }
        // console.log(data)

    }catch(error){
        console.log(error);
    }
}

const listarPaises = async()=>{
    try{
        const response = await fetch("./paises");//petición con fecht trae una promesa (petición que puede tener una respuesta en el futuro , ahora o nunca) y await es para esperar esa respuiesta
        const data= await response.json();//obtenemos en contenido de la respuesta y lo desencriptamos de json y lo convertimos en un objeto de js nativo (constante data)
        
        if(data.message==="Success"){//data.message viene desde la respuesta JSON de Django
            let opciones = ``;

            data.paises.forEach((pais)=>{
                opciones+=`<option value='${pais.id}'>${pais.nombre}</option>`//poblamos en el contenido traido del backend (que a su vez trae de la BD)
            });
            cboPais.innerHTML=opciones;//insertamos html en el select de id 'cboPais',si tenemos un elemento con un id en html podemos acceder a el sin el getElemntById, solo con el nombre del id
            listarCiudades(data.paises[0].id);//como peru es el primer pais en cargar (posicion 0), seleccionamos sus ciudades
        }else{
            alert("Paises no encrontrados")
        }
        // console.log(data)

    }catch (error){
        console.log(error);
    }

};






const cargaInicial = async() => {
    await listarPaises();

    cboPais.addEventListener("change", (event) => {//cuando se haga un cambio en cboPais se va a llamar a la funcion listarPaises
        // console.log(event)
        // console.log(event.target)//el target es el elemento html objetivo (a donde se esta haciendo el cambio)
        // console.log(event.target.value)//el valor del objetivo
        listarCiudades(event.target.value);
    });
};

window.addEventListener("load",async ()=> {
    await cargaInicial();
});