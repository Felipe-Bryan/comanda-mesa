export function alertModal(title: string, content: string, cancelOption: boolean) {
  const titleSpot = document.getElementById('modal2Title')!;
  const contentSpot = document.getElementById('modal2Content')!;
  const modalFooter = document.getElementById('modal2Footer')!;

  titleSpot.innerHTML = title;
  contentSpot.innerHTML = content;

  if (cancelOption === true) {
    modalFooter.innerHTML = `
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="cancelModal2">Cancelar</button>
    <button class="btn btn-primary" data-bs-dismiss="modal" id="finishModal2">Finalizar</button>
    `;
  } else {
    modalFooter.innerHTML = `<button class="btn btn-primary" data-bs-target="#cartModal" data-bs-toggle="modal">Ok</button>`;
  }
}
