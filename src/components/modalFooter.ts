export function modalFooter(returnOption: string, continueOption: string) {
  return `
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="closeModal">${returnOption}</button>
    <button type="button" class="btn btn-success" id="addOrder">${continueOption}</button>`;
}
