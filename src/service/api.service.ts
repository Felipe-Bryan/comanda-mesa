import axios from 'axios';

const api = axios.create({
  baseURL: 'https://comanda-api-ihnr.onrender.com',
});

export class apiData {
  public async getData(url: string, id?: string) {
    const endpoint = `${url}/${id ? id : ''}`;

    let result: any;

    await api.get(endpoint).then((data) => {
      result = data.data.data;
    });

    return result;
  }

  public async postData(url: string, info: any) {
    let result: any;

    await api.post(url, info).then((data) => {
      result = data.data;
    });

    return result;
  }
}
