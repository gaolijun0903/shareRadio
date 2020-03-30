let baseUrl = "";
import axios from "axios";
export function getNetData(url, params={}) {
            return new Promise((resolve, reject) => {
                axios
                    .get(`${baseUrl}${url}`, {
                        params: params
                    })
                    .then(function (response) {
                        resolve(response.data);
                    })
                    .catch(function (error) {
                        reject(error);
                    });
            });
    }

export function postNetData(params) {
    alert(0);
}