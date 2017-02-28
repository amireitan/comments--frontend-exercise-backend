export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export function openModal(data) {
    return {type: OPEN_MODAL, payload: data}
}

export function closeModal() {
    return {type: CLOSE_MODAL}
}

