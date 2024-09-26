const baseEndpoint = 'https://api.github.com';
const usersEndpoint = `${baseEndpoint}/users`;

//correccion de selectores
const $n = document.querySelector('.name'); //se agrego un punto para seleccionar clase
const $b = document.querySelector('.blog'); //se agrego un punto para seleccionar clase
const $l = document.querySelector('.location');


async function displayUser(username) { //se agregó async para que funcione await
  $n.textContent = 'Cargando...';
  try{ //agregado para manejar errores
    const response = await fetch(`${usersEndpoint}/${username}`);
    //validación error
    if (!response.ok){
      throw new Error(`HTTP error! status: ${response.status}`);

    }//if
    const data = await response.json(); //obteemos datos en JSON
    console.log(data);
    //se quitaron '{}' de todas
    $n.textContent = data.name;
    $b.textContent = data.blog || 'No tiene blog'; ///manejo si no hay blog
    $l.textContent = data.location || 'Ubicación no disponible';//manejo si no hay ubicación
  } catch (err){
    handleError(err); // llamado a función de manejar errores 
  }//catch

}//displayUser

function handleError(err) {
  console.error('OH NO!', err); //se cambio de console.log a error y se agregó parámetro err en la misma
  $n.textContent = `Algo salió mal: ${err.message}`; //se utilizó message para tener el msj
}


displayUser('stolinski').catch(handleError);