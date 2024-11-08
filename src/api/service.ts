import axios from "axios";

export function postcriarPix(body: any) {
    axios.post('/criar-pix', {
        body
      })
      .then( response => {
        console.log(response);
      })
      .catch( error => {
        console.error(error);
      });

}