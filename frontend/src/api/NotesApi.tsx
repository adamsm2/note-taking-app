import backendApi from "./BackendApi.tsx";

const noteClient = backendApi('/notes')

export const notesApi = {
    getAll() {
        return noteClient.get('')
    },

    getById(id: string | undefined) {
        return noteClient.get(`/${id}`)
    },

    create(note: Note) {
        return noteClient.post('', note)
    },

    update(id: string | undefined, note: Note) {
        return noteClient.put(`/${id}`, note)
    },

    delete(id: string | undefined) {
        return noteClient.delete(`/${id}`)
    }
}