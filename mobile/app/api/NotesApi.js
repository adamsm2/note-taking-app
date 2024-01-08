import backendApi from "./BackendApi.js";

const noteClient = backendApi('/v2/notes')

export const notesApi = {
    getAll() {
        return noteClient.get('')
    },

    getById(id) {
        return noteClient.get(`/${id}`)
    },

    create(note) {
        return noteClient.post('', note)
    },

    update(id, note) {
        return noteClient.put(`/${id}`, note)
    },

    delete(id) {
        return noteClient.delete(`/${id}`)
    }
}