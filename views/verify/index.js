// 
const textInfo = document.querySelector('#text-info');

(async () => {
  try {
    // se extrae el token de la url con el metodo javascript .split
    const token = window.location.pathname.split('/')[3];
    // se extrae el id de la url con el metodo de javascript .split
    const id = window.location.pathname.split('/')[2];
    console.log(id);
    // envia el token y el id a la ruta app.js y luego lo redirije a los controladores
      await axios.patch(`/api/users/${id}/${token}`);
      window.location.pathname = '/login/';
  } catch (error) {
      textInfo.innerHTML = error.response.data.error;
  }
})();
