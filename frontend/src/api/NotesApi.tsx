import backendApi from "./BackendApi.tsx";
import {bearerAuth} from "./BearerAuth";

const noteClient = backendApi('/notes')

export const notesApi = {
    getAll(token) {
        return noteClient.get('', {
            headers: {Authorization: bearerAuth(token)}
        })
    },

    getById(id, token) {
        return noteClient.get(`/${id}`, {
            headers: {Authorization: bearerAuth(token)}
        })
    },

    create(note, token) {
        return noteClient.post('', note, {
            headers: {Authorization: bearerAuth(token)}
        })
    },

    update(id, note, token) {
        return noteClient.put(`/${id}`, note, {
            headers: {Authorization: bearerAuth(token)}
        })
    },

    delete(id, token) {
        return noteClient.delete(`/${id}`, {
            headers: {Authorization: bearerAuth(token)}
        })
    }
}